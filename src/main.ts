import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // session and passport config
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session())

  // cors
  app.enableCors({ origin: '*' });

  // validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // start server
  await app.listen(4000);
}
bootstrap();
