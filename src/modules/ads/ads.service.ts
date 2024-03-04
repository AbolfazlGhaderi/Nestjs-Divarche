import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdsEntity } from 'src/database/models/ads.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CityService } from '../city/city.service';
import { CreateAdDTO } from './dto/create.ad';
import { AccountsService } from '../accounts/accounts.service';
import { PhotoService } from '../photo/photo.service';
@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsEntity)
    private readonly adsRepository: Repository<AdsEntity>,
    private readonly categoryService: CategoryService,
    private readonly cityService: CityService,
    private readonly accountService: AccountsService,
    private readonly photoSerivese: PhotoService,
  ) {}

  async getAllAdsByCategoryName(categoryName: string) {
    // find category
    const category =
      await this.categoryService.findCategoryByName(categoryName);

    if (!category) throw new HttpException('category not found', 404);

    // find ads by category
    const ads = await this.adsRepository.find({
      where: { category: category },
      relations: { photo: true },
    });
    if (!ads[0]) throw new HttpException('ads not found', 404);

    return ads;
  }

  async getAllAdsByCityName(cityName: string) {
    // find city
    const city = await this.cityService.findCityByName(cityName);

    // find ads by city name
    const ads = await this.adsRepository.find({
      where: { city: city },
      relations: { photo: true },
    });
    if (!ads[0]) throw new HttpException('ads not found', 404);

    return ads;
  }

  async createAdS(Data: CreateAdDTO, accountId: number) {
    const { category, city, description, photourl, price, title } = Data;

    const _city = await this.cityService.findCityByName(city);
    const _category = await this.categoryService.findCategoryByName(category);
    const _account = await this.accountService.findAccountById(accountId);
    
    let _photo: object = null;
    if (photourl) {
      _photo = await this.photoSerivese.findPhotoByUrl(photourl);
    }

    const newAd = this.adsRepository.create({
      title: title,
      description: description,
      price: price,
      city: _city,
      category: _category,
      account: _account,
      photo: _photo,
    });

    const adSaved = await this.adsRepository.save(newAd);

    return { message: 'Create Successfully' };
  }

  async deleteAdS(id: number) {
    const ad = await this.adsRepository.delete({ id: id });

    if (ad.affected === 0) throw new HttpException('ad not found', 404);

    return {
      message: 'Delete Successfully',
    };
  }
}
