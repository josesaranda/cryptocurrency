import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountsModule } from 'src/pages/accounts/accounts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DetailsModule } from 'src/pages/details/details.module';
import { MatCardModule } from '@angular/material/card';
import { DetailsGuard } from 'src/pages/details/details.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    AccountsModule,
    DetailsModule,
    MatProgressSpinnerModule
  ],
  providers: [DetailsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
