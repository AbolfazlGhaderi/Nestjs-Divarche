import { HttpException, Injectable } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { AccountEntity } from 'src/database/models/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import sendSMS from 'src/global/helpers/send.sms';
import Redis from 'ioredis';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly sendSMS = new sendSMS();
  private readonly redisClient: Redis;
  constructor(
    private readonly jwtService:JwtService,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async login(Data: loginDTO) {
    
    if (!Data.code) {
      const { phoneNumber } = Data;
      // check otp code
      await this.redisClient.del(phoneNumber + ':login');

      // create otp code
      const otpCode = this.sendSMS.sendOtpLogin(phoneNumber);

      //save otp code in redis
      await this.redisClient.set(
        Data.phoneNumber + ':login',otpCode,'EX',60,
      );

      // RETURN
      return { phoneNumber: phoneNumber };

    } else {
      const { phoneNumber,code } = Data;
      
      // find otp code in redis
      const otpCode = await this.redisClient.get(phoneNumber + ':login');


      // check otp code
      if (!otpCode || otpCode !== code)
        throw new HttpException('OTP Code not found', 404);

      // delete otp code  
      await this.redisClient.del(phoneNumber + ':login');

      // find account by phone number
      let account = await this.accountRepository.findOne({
        where: { mobile_number: phoneNumber },
      });

      
      // save account
      if (!account) {
        
        account = await this.accountRepository.save({ mobile_number: phoneNumber });
      }

      const accessToken = this.jwtService.sign({ sub: account.id })

      return {
        statusCode: 200,
        accessToken:accessToken
      };
    }
  }
}
