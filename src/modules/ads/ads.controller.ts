import { Controller, Post } from '@nestjs/common';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post('new-ad')
  createAd(){
    
  }
}
