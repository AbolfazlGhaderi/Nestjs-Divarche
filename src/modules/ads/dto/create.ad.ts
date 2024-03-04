import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateAdDTO {
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  photourl?: string;

  @IsNotEmpty()
  @IsNumberString()
  price: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  city: string;
}
