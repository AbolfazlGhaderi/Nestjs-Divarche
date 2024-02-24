import { Module, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/models/account.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
