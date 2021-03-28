import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AccountService } from 'src/services/AccountService';
import { ExchangeService } from 'src/services/ExchangeService';
import { Account } from '../models/Account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';

  displayedColumns: string[] = ['account', 'category', 'tag', 'balance', 'availableBalance'];
  dataSource = new MatTableDataSource<Account>([]);
 
  exchange?: number;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly accountService: AccountService,
    private readonly exchangeService: ExchangeService
  ){}

  async ngAfterViewInit() {
    this.exchange = (await this.getExchange()).value;
    let accounts = await this.findAllAccounts();
    this.dataSource.data = accounts;
    this.dataSource.sort = this.sort;
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
}
