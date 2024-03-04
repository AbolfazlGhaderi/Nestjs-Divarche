import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/models/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from 'src/global/strategies/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '2d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,jwtStrategy],
})
export class AuthModule {}
