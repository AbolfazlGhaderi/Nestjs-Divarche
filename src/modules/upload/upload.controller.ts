import {
  Body,
  Controller,
  HttpException,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { jwtAuthGuard } from '../auth/guards/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageAdsImage } from 'src/global/configs/storage.ads.image';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // upload ad photo
  @Post('adphoto')
  @UseGuards(jwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('photo', 1, {
      limits: { fileSize: 1024 * 1024 * 2 }, // 2MB 1file
      fileFilter(req, file: Express.Multer.File, cb) {
        if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
      storage: storageAdsImage,
    }),
  )
  async uploadeAdPhotoC(@UploadedFiles() file: Express.Multer.File) {
   
    return await  this.uploadService.uploadAdPhotoS(file);
  }

  // ------------------
}
