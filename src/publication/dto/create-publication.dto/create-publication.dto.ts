import { IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsDateString()
  dateToPublish: string;

  @IsBoolean()
  published: boolean = false;

  @IsNotEmpty()
  socialMedia: string;
}
