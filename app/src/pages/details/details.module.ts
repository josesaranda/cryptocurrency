import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatSortModule
  ],
  bootstrap: [DetailsComponent]
})
export class DetailsModule { }
