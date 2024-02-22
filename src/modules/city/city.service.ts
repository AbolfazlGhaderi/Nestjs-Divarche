import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/database/models/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly CityReposirory: Repository<CityEntity>,
  ) {}

  // Get All Cities
  async getAllCities() {

    const cities = await this.CityReposirory.find();

    if(!cities[0]) throw new HttpException('Cities Not Found',404)

    return cities
  }

  // Find City
  async findCityByName(name: string) {
    const city = await this.CityReposirory.findOne({
      where: { city_name: name.toString() },
    });
    if (!city) throw new HttpException('city not found', 404);
    return city;
  }
}
