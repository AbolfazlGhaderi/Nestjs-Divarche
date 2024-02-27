import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsEntity } from 'src/database/models/ads.entity';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from 'src/database/models/category.entity';
import { CityService } from '../city/city.service';
import { CityEntity } from 'src/database/models/city.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdsEntity,CategoryEntity,CityEntity])],
  controllers: [AdsController],
  providers: [AdsService,CategoryService,CityService],
})
export class AdsModule {}
