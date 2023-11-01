import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockCreateFormComponent } from './components/stock-create-form/stock-create-form.component';
import { HeaderComponent } from './components/header/header.component';
import { StockFavoriteListComponent } from './components/stock-favorite-list/stock-favorite-list.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

import { ServerHttpService } from './services/stock-server-http.service';
import { UserService } from './services/user.service';
import { StockUpdateFormComponent } from './components/stock-update-form/stock-update-form.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockCreateFormComponent,
    HeaderComponent,
    StockFavoriteListComponent,
    UserRegisterComponent,
    UserLoginComponent,
    StockUpdateFormComponent,
    StockDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ServerHttpService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
