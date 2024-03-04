import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsEntity } from 'src/database/models/ads.entity';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from 'src/database/models/category.entity';
import { CityService } from '../city/city.service';
import { CityEntity } from 'src/database/models/city.entity';
import { AccountsService } from '../accounts/accounts.service';
import { AccountEntity } from 'src/database/models/account.entity';
import { PhotoService } from '../photo/photo.service';
import { PhotoEntity } from 'src/database/models/photo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdsEntity,CategoryEntity,CityEntity,AccountEntity,PhotoEntity])],
  controllers: [AdsController],
  providers: [AdsService,CategoryService,CityService,AccountsService,PhotoService],
})
export class AdsModule {}
  