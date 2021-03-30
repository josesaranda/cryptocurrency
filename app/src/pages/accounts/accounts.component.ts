import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/services/AccountService';
import { ExchangeService } from 'src/services/ExchangeService';
import { btcToDollars } from 'src/util';
import { Account } from '../../models/Account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.less']
})
export class AccountsComponent {
  displayedColumns: string[] = ['account', 'category', 'tag', 'balance', 'availableBalance'];
  dataSource = new MatTableDataSource<Account>([]);
 
  exchange?: number;

  private accountSubscription?: Subscription; 
  private exchangeSubscription?: Subscription; 

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly accountService: AccountService,
    private readonly exchangeService: ExchangeService,
    private readonly router: Router
  ){}

  async ngOnInit(): Promise<void> {
    document.title = 'Accounts';
    this.exchange = await this.getExchange();
    let accounts = await this.findAllAccounts();
    this.dataSource.data = accounts;
    this.dataSource.sort = this.sort;
    this.exchangeSubscription = this.exchangeService.observeExchange().subscribe(value => {
      this.exchange = value;
    });
    this.accountSubscription = this.accountService.observeAccount().subscribe(account => {
      if(account){
        let index = this.dataSource.data.findIndex(ac => ac.id === account.id);
        let oldAccount = this.dataSource.data[index];
        if(oldAccount){
          let color = undefined;
          if(oldAccount.balance > account!.balance){
            color = 'red';
          }else if(oldAccount.balance < account!.balance){
            color = 'green';
          }
          if(color){
            let emoji = color === 'red' ? "🔴 " : "🟢 ";
            oldAccount.account = emoji + oldAccount.account.replace("🔴", "").replace("🟢","").trim();
            oldAccount.balance = account.balance;
            oldAccount.availableBalance = account.availableBalance;
            document.getElementById('account-'+oldAccount.id)?.classList.remove('background-green','background-red');
            document.getElementById('account-'+oldAccount.id)?.classList.add('background-'+color);
            document.title = oldAccount.account;
          }
        }
      }
    });
  }

  ngOnDestroy(){
    if(this.accountSubscription) this.accountSubscription.unsubscribe();
    if(this.exchangeSubscription) this.exchangeSubscription.unsubscribe();
  }

  private async getExchange(){
    return this.exchangeService.getExchange();
  }

  private async findAllAccounts(){
    return this.accountService.findAll();
  }

  btcToDollars = (btc: number) => btcToDollars(btc, this.exchange!).toFixed(2);

  navigateTo(account: Account){
    this.router.navigateByUrl('/accounts/' + account.id + '/details');
  }
}
