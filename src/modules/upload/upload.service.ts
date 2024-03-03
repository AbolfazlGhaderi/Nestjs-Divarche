import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  uploadAdPhotoS(file: Express.Multer.File) {
    // file empty
    if (!file[0]) throw new HttpException('photo is empty', 400);

    // return file path
    return {
      filePath: file[0].path,
    };
  }
}
