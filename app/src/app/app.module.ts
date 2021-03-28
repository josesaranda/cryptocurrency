import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { FetchService } from 'src/services/FetchService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccountService } from 'src/services/AccountService';
import { ExchangeService } from 'src/services/ExchangeService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule 
  ],
  providers: [AccountService, ExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
