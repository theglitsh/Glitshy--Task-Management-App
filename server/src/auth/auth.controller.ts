import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LinkedInProfileDto } from './dto/linkedin-profile.dto';
import { LoginResponse } from './responses/login.response';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/email')
  async register(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto.email, loginDto.password);
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Login failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('register/linkedin')
  async registerWithLinkedIn(@Body() linkedInProfileDto: LinkedInProfileDto) {
    try {
      const user =
        await this.authService.registerWithLinkedIn(linkedInProfileDto);
      return user;
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'LinkedIn registration failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // req.user should be populated by the JwtStrategy
    const userId = req.user.userId;

    const user = await this.authService.getUserById(userId);
    return user;
  }
}
