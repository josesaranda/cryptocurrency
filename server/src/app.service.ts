import { Injectable } from '@nestjs/common';
import { accounts } from './db';

export type Account = {
  account: string;
  category: string;
  tag: string;
  balance: number;
  availableBalance: number;
};

const MAX_BTC_VALUE = 12000;
const MIN_BTC_VALUE = 5000;

@Injectable()
export class AppService {
  
  findAllAccounts(): Account[] {
    return accounts;
  }

  getExchange(): number {
    return (Math.random() * (MAX_BTC_VALUE - MIN_BTC_VALUE)) + MIN_BTC_VALUE;
  }
}
