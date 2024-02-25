import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { jwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('')
  @UseGuards(jwtAuthGuard)
  getAllAccounts(@Req() request:Request) {
    console.log(request.user);
    return this.accountsService.getAllAccounts();
  }
  
}
