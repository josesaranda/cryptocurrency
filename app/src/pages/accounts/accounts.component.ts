import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/AccountService';
import { ExchangeService } from 'src/services/ExchangeService';
import { Account } from '../../models/Account';

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.less']
})
export class AccountsComponent {
  displayedColumns: string[] = ['account', 'category', 'tag', 'balance', 'availableBalance'];
  dataSource = new MatTableDataSource<Account>([]);
 
  exchange?: number;
  accounts?: Account[];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly accountService: AccountService,
    private readonly exchangeService: ExchangeService,
    private readonly router: Router
  ){}

  async ngOnInit() {
    this.exchange = await this.getExchange();
    this.accounts = await this.findAllAccounts();
    this.dataSource.data = this.accounts;
    this.dataSource.sort = this.sort;
    this.exchangeService.subscribeToExchange().subscribe(value => {
      this.exchange = value;
    });
    this.accountService.onChangeAccount().subscribe(account => {
      console.log('account', account);
      // let oldAccount = this.accounts!.find(ac => ac.id === account!.id);
      // if(oldAccount){
      //   console.log(oldAccount.balance > account!.balance);
      // }
    });
  }

  private async getExchange(){
    return this.exchangeService.getExchange();
  }

  private async findAllAccounts(){
    return this.accountService.findAll();
  }

  btcToDollars(btc: number): string {
    return (btc * this.exchange!).toFixed(2);
  }

  navigateTo(){
    this.router.navigateByUrl('/accounts/5/details');
  }
}
