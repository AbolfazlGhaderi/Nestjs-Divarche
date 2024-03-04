import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoEntity } from "src/database/models/photo.entity";

@Module({
imports:[TypeOrmModule.forFeature([PhotoEntity])],
    controllers:[UploadController],
    providers:[UploadService]
})

export class UploadeModule{}