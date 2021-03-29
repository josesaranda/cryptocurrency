import { Injectable } from '@nestjs/common';
import { accounts as accountsFromDB } from './db';

export type Account = {
  id: number;
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

  private accounts: Account[] = accountsFromDB;
  
  findAllAccounts(): Account[] {
    return this.accounts;
  }

  findOneAccount(id: number){
    return this.accounts.find(acc => acc.id === id);
  }

  findRandomAccount(): Account {
    let random = Math.floor(Math.random() * this.accounts.length);
    return this.accounts[random];
  }

  updateAccount(id: number, account: Omit<Partial<Account>, 'id'>){
    let newAccount = this.findOneAccount(id);
    newAccount = {...newAccount, ...account};
    let index = this.accounts.findIndex(acc => acc.id === id);
    this.accounts[index] = newAccount;
    return newAccount;
  }

  getExchange(): number {
    return (Math.random() * (MAX_BTC_VALUE - MIN_BTC_VALUE)) + MIN_BTC_VALUE;
  }
}
