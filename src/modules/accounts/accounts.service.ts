import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../../database/models/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  getAllAccounts() {
    return this.accountRepository.find();
  }

  async findAccountById(id: number) {
    const account = await this.accountRepository.findOne({ where: { id: id } });

    if (!account) throw new HttpException('account not found', 404);
    
    return account;
  }
}
