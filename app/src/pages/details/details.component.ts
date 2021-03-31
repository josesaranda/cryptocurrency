import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/models/Transaction';
import { AccountService } from 'src/services/AccountService';
import { ExchangeService } from 'src/services/ExchangeService';
import { btcToDollars } from 'src/util';
import { Account } from '../../models/Account';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent {

  private id?: number;

  account?: Account;
  exchange?: number;

  displayedColumns: string[] = ['orderId', 'orderCode', 'type', 'debit', 'credit', 'balance', 'date'];
  dataSource = new MatTableDataSource<Transaction>([]);

  private accountSubscription?: Subscription; 
  private exchangeSubscription?: Subscription; 

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: ActivatedRoute,
    private accountService: AccountService,
    private exchangeService: ExchangeService
  ){}

  async ngOnInit(){
    this.id = this.router.snapshot.params.id;
    this.account = await this.accountService.findOne(this.id!);
    document.title = this.account.account;
    this.exchange = await this.exchangeService.getExchange();
    this.exchangeSubscription = this.exchangeService.observeExchange().subscribe(value => {
      this.exchange = value;
    });
    let transactions = await this.accountService.findOneTransactions(this.id!);
    this.dataSource.data = transactions;
    this.dataSource.sort = this.sort;

    this.accountSubscription = this.accountService.observeAccount().subscribe(account => {
      if(account && this.account && account.id === this.account.id){
          let color = undefined;
          if(this.account.balance > account!.balance){
            color = 'red';
          }else if(this.account.balance < account!.balance){
            color = 'green';
          }
          if(color){
            document.getElementById('balance')?.classList.remove('color-green','color-red');
            document.getElementById('balance')?.classList.add('color-'+color);
          }
        }
    });
  }

  ngOnDestroy(){
    if(this.accountSubscription) this.accountSubscription.unsubscribe();
    if(this.exchangeSubscription) this.exchangeSubscription.unsubscribe();
  }

  btcToDollars = (btc: number) => btcToDollars(btc, this.exchange!).toFixed(2);
}
