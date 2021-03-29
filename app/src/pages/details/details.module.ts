import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule 
  ],
  bootstrap: [DetailsComponent]
})
export class DetailsModule { }
