import { IsUrl } from 'class-validator';

export class LinkedInProfileDto {
  @IsUrl()
  linkedinProfileUrl: string;
}
