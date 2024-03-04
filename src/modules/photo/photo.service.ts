import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from 'src/database/models/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  async findPhotoByUrl(photo_url: string) {
      const photo = await this.photoRepository.findOne({
        where: {
          photo_url:photo_url
        }
      })

      if(!photo) throw new HttpException('photo not found',404)
      return photo
  }
}
