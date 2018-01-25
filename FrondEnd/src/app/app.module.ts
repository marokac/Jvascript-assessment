import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DeshbordComponent } from './deshbord/deshbord.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from "./app-routing.module";
import { AppServiceService } from "./app-service.service";
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TopupComponent } from './topup/topup.component';
import { BuyComponentComponent } from './buy-component/buy-component.component';
import { TransectionsComponent } from './transections/transections.component';

@NgModule({
  declarations: [
    AppComponent,
    DeshbordComponent,
    LoginComponent,
    RegisterComponent,
    TopupComponent,
    BuyComponentComponent,
    TransectionsComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,RouterModule, FormsModule,
    HttpModule,ReactiveFormsModule
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
