import { Component } from '@angular/core';
import { ExchangeService } from 'src/services/ExchangeService';
import { wait } from 'src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  exchange?: number;
  loaded: boolean = false;

  constructor(
    public readonly exchangeService: ExchangeService
  ){}

  ngAfterViewInit() {
    this.loadApp();
  }

  private loadApp = async () => {
    await wait(1000); 
    this.exchange = await this.getExchange();
    this.loaded = true;
    this.exchangeService.subscribeToExchange().subscribe(value => {
      this.exchange = value;
    });
  }

  private getExchange(){
    return this.exchangeService.getExchange();
  }
}
