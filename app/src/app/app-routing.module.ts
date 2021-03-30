import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from 'src/pages/accounts/accounts.component';
import { DetailsComponent } from 'src/pages/details/details.component';
import { DetailsGuard } from 'src/pages/details/details.guard';

const routes: Routes = [
  {path: 'accounts', component: AccountsComponent},
  {path: 'accounts/:id/details', component: DetailsComponent, canActivate: [DetailsGuard]},
  {path: '', redirectTo: '/accounts', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
