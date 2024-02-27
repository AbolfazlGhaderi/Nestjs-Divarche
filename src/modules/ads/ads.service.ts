import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdsEntity } from 'src/database/models/ads.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CityService } from '../city/city.service';
@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsEntity)
    private readonly adsRepository: Repository<AdsEntity>,
    private readonly categoryService: CategoryService,
    private readonly cityService: CityService,
  ) {}

  async getAllAdsByCategoryName(categoryName: string) {
    // find category
    const category =
      await this.categoryService.findCategoryByName(categoryName);

    if (!category) throw new HttpException('category not found', 404);

    // find ads by category
    const ads = await this.adsRepository.find({
      where: { category: category },
    });
    if (!ads[0]) throw new HttpException('ads not found', 404);

    return ads;
  }

  async getAllAdsByCityName(cityName: string) {

    // get city 
    const city = await this.cityService.findCityByName(cityName);

    // get ads by city name
    const ads = await this.adsRepository.find({where:{city:city}})
    if (!ads[0]) throw new HttpException('ads not found', 404);

  }
}
