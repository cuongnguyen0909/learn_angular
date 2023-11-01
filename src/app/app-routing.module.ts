import { NgModule } from '@angular/core';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StockCreateFormComponent } from './components/stock-create-form/stock-create-form.component';
import { StockFavoriteListComponent } from './components/stock-favorite-list/stock-favorite-list.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { StockUpdateFormComponent } from './components/stock-update-form/stock-update-form.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'home', component: StockListComponent },
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: 'favorite-stocks', component: StockFavoriteListComponent },
  { path: 'stock-create-form', component: StockCreateFormComponent },
  { path: 'stock-update-form/:id', component: StockUpdateFormComponent },
  { path: 'stock-detail/:id', component: StockDetailComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'user-list', component: UserListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
