import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Account, Transaction } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/accounts')
  findAllAccounts(): Account[] {
    return this.appService.findAllAccounts();
  }

  @Get('/api/accounts/:id')
  findOneAccount(@Param('id') id: string): Account {
    let account = this.appService.findOneAccount(parseInt(id));
    if(!account) throw new NotFoundException('')
    return account;
  }

  @Get('/api/accounts/:id/transactions')
  findOneAccountTransactions(@Param('id') id: string): Transaction[] {;
    return this.appService.findOneAccountTransactions(parseInt(id));
  }

  @Get('/api/exchange')
  getExchange(): {value: number} {
    return {value: this.appService.getExchange()};
  }
}
