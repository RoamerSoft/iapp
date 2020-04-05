import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'connect', pathMatch: 'full' },
  { path: 'home/:sessionKey', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'connect', loadChildren: './pages/connect/connect.module#ConnectPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
