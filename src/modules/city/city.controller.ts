import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('')
  async getAllCities(){
    return await this.cityService.getAllCities()
    
  }

  @Get(':city')
  findCity(@Param('city') cityName:string){
    return this.cityService.findCityByName(cityName.toString())
  }
}
