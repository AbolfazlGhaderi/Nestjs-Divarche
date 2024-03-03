import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdsEntity } from 'src/database/models/ads.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CityService } from '../city/city.service';
import { CreateAdDTO } from './dto/create.ad';
import { AccountsService } from '../accounts/accounts.service';
@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsEntity)
    private readonly adsRepository: Repository<AdsEntity>,
    private readonly categoryService: CategoryService,
    private readonly cityService: CityService,
    private readonly accountService: AccountsService,
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
    const ads = await this.adsRepository.find({ where: { city: city } });
    if (!ads[0]) throw new HttpException('ads not found', 404);
  }

  async createAdS(Data: CreateAdDTO, accountId: number) {
    const { category, city, description, photo, price, title } = Data;

    const _city = await this.cityService.findCityByName(city);
    const _category = await this.categoryService.findCategoryByName(category);
    const _account = await this.accountService.findAccountById(accountId);
    const newAd = this.adsRepository.create({
      title: title,
      photo: photo,
      description: description,
      price: price,
      city: _city,
      category: _category,
      account: _account,
    });
    const adSaved = await this.adsRepository.save(newAd);

    return {message:'Create Successfully'};
  }
}
