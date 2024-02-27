import { Controller, Post, Get, Param, HttpException } from '@nestjs/common';
import { AdsService } from './ads.service';


@Controller('ads')
export class AdsController {
  constructor(
    private readonly adsService: AdsService,
  ) {}

  @Get('category/:category')
  async finsAllAdsByCategory(@Param('category') categoryName: string) {
    return this.adsService.getAllAdsByCategoryName(categoryName.toString())

  }

  @Get('city/:city')
  findAllCityByName(@Param('city') cityName:string){
    return this.adsService.getAllAdsByCityName(cityName.toString())
  }

  @Post('new-ad')
  createAd() {}
}
