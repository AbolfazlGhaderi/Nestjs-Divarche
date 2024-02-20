import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AccountEntity } from './database/models/account.entity';
import { CategoryEntity } from './database/models/category.entity';
import { CityEntity } from './database/models/city.entity';
import { AdsEntity } from './database/models/ads.entity';
import { loggerMiddleware } from './global/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database:process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities:[AccountEntity,CategoryEntity,CityEntity,AdsEntity],
      synchronize: true,
      logging: false,
    }),
    AccountsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*')
  }
}
