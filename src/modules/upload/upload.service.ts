import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from 'src/database/models/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}
  async uploadAdPhotoS(file: Express.Multer.File) {


    // file empty
    if (!file[0]) throw new HttpException('photo is empty', 400);


    const photo = await this.photoRepository.save({
      photo_url: file[0].path,
    });

    // return file path
    return {
      filePath: photo.photo_url,
    };
  }
}
