import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LinkedInProfileDto } from './dto/linkedin-profile.dto';
import { LoginResponse } from './responses/login.response';
import { Builder, By, until, Browser } from 'selenium-webdriver';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoginResponse> {
    const { email } = createUserDto;

    // Check if the email already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const payload = { email: user.email, sub: user._id };

    return {
      email: createUserDto.email,
      name: createUserDto.name,
      token: this.jwtService.sign(payload),
    };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        { message: 'Please enter a correct email or password' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { email: user.email, sub: user._id };
    return {
      email: user.email,
      name: user.name,
      token: this.jwtService.sign(payload),
    };
  }

  async registerWithLinkedIn(
    linkedInProfileDto: LinkedInProfileDto,
  ): Promise<User> {
    const { linkedinProfileUrl } = linkedInProfileDto;

    const userProfileData =
      await this.scrapeLinkedInProfile(linkedinProfileUrl);

    // Check if a user with this LinkedIn URL already exists
    const existingUser = await this.userModel
      .findOne({ linkedinProfileUrl })
      .exec();
    if (existingUser) {
      throw new ConflictException(
        'A user with this LinkedIn profile already exists',
      );
    }

    const newUser = new this.userModel(userProfileData);

    return newUser.save();
  }

  private async scrapeLinkedInProfile(linkedinProfileUrl: string) {
    // Set up the Selenium WebDriver
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
      // Navigate to the LinkedIn profile URL
      await driver.get(linkedinProfileUrl);

      // Wait for the profile name element to be visible and get the text
      const nameElement = await driver.wait(
        until.elementLocated(By.css('.top-card-layout__title')),
        10000,
      );

      const name = await nameElement.getText();

      // Scrape the email if available, this might be in a different section (adjust the selector)
      let email = '';
      try {
        await driver.findElement(By.css('.contact-info')).click();
        const emailElement = await driver.wait(
          until.elementLocated(
            By.css('.ci-email .pv-contact-info__contact-item'),
          ),
          10000,
        );
        email = await emailElement.getText();
      } catch (err) {
        // If email is not found or the element doesn't exist
        email = '';
      }

      // Return the scraped data
      return {
        name,
        // Set a placeholder if no email is found
        email: email || `email-not-found@linkedin.com`,
        linkedinProfileUrl,
        // Set a random password or generate one
        password: await bcrypt.hash('randompassword', 10),
      };
    } finally {
      // Ensure the driver is properly closed after the scraping is done
      await driver.quit();
    }
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
