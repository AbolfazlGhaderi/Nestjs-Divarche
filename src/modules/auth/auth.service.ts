import { Injectable } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { AccountEntity } from 'src/database/models/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import sendSMS from 'src/global/helpers/send.sms';
import  Redis  from 'ioredis';

@Injectable()
export class AuthService {
    private readonly sendSMS = new sendSMS();
    private readonly redisClient : Redis
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379
    })
  }


  async login(Data: loginDTO) {
    if (Data.phoneNumber) {
      const otpCode = this.sendSMS.sendOtpLogin()
      const savedToRedis = await this.redisClient.set(Data.phoneNumber, otpCode) 
      return savedToRedis 

      
    }
  }
}
