import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { jwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateAdDTO } from './dto/create.ad';
import { Request } from 'express';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get('category/:category')
  async finsAllAdsByCategory(@Param('category') categoryName: string) {
    return this.adsService.getAllAdsByCategoryName(categoryName.toString());
  }

  @Get('city/:city')
  findAllCityByName(@Param('city') cityName: string) {
    return this.adsService.getAllAdsByCityName(cityName.toString());
  }

  @Post('new-ad')
  @UseGuards(jwtAuthGuard)
  crateAdC(@Body() adData: CreateAdDTO, @Req() request: Request) {
  
    return this.adsService.createAdS(adData, +request.user['id']);
    
  }
}
