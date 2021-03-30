import { Injectable } from '@nestjs/common';
import { accounts as accountsFromDB, transactions as transactionsFromDB } from './db';
import { Transaction, Account } from './models';

const MAX_BTC_VALUE = 12000;
const MIN_BTC_VALUE = 5000;

@Injectable()
export class AppService {

  private accounts: Account[] = accountsFromDB;
  private transactions : Transaction[] = transactionsFromDB;
  
  findAllAccounts(): Account[] {
    return this.accounts;
  }

  findOneAccount(id: number){
    return this.accounts.find(acc => acc.id === id);
  }

  findOneAccountTransactions(id: number): Transaction[]{
    return this.transactions.filter(trans => trans.accountId === id);
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
