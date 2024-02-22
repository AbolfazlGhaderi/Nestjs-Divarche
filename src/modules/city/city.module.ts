import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/database/models/city.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
