import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './modules/accounts/accounts.module';
import { loggerMiddleware } from './global/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { AdsModule } from './modules/ads/ads.module';
import { CityModule } from './modules/city/city.module';
import { CategoryModule } from './modules/category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadeModule } from './modules/upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [__dirname + '/database/models/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AccountsModule,
    AuthModule,
    AdsModule,
    CityModule,
    CategoryModule,
    UploadeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}
