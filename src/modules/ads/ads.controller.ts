import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Body,
  Req,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { jwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateAdDTO } from './dto/create.ad';
import { Request } from 'express';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get('category/:category')
  @HttpCode(HttpStatus.OK)
  async finsAllAdsByCategory(@Param('category') categoryName: string) {
    return this.adsService.getAllAdsByCategoryName(categoryName.toString());
  }

  @Get('city/:city')
  @HttpCode(HttpStatus.OK)
  findAllCityByName(@Param('city') cityName: string) {
    return this.adsService.getAllAdsByCityName(cityName.toString());
  }

  @Post('new-ad')
  @UseGuards(jwtAuthGuard)
  async crateAdC(@Body() adData: CreateAdDTO, @Req() request: Request) {
    return await this.adsService.createAdS(adData, +request.user['id']);
  }

  @Delete(':id')
  @UseGuards(jwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteAdC(@Param('id', ParseIntPipe) adId: number) {
    return await this.adsService.deleteAdS(adId);
  }
}
