import { Controller, Get } from '@nestjs/common';
import { AppService, Account } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/accounts')
  findAllAccounts(): Account[] {
    return this.appService.findAllAccounts();
  }

  @Get('/api/exchange')
  getExchange(): {value: number} {
    return {value: this.appService.getExchange()};
  }
}
