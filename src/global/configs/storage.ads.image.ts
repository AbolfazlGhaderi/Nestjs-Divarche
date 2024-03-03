import { Request } from 'express';
import { diskStorage } from 'multer';

export const storageAdsImage = diskStorage({
  destination: './uploads/ads',
  filename: (req: Request, file, cb) => {
    
    const date = new Date().toISOString().replace(/:/g, '-');

    const idReq = req.user;

    if (file.mimetype == 'image/jpg' || file.mimetype === 'image/jpeg')
      cb(null, `id-${idReq['id']}_${date}.jpg`);
    
    else if (file.mimetype == 'image/png')
      cb(null, `id-${idReq['id']}_${date}.png`);
  },
});
