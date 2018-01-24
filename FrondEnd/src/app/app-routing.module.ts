import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeshbordComponent } from "./deshbord/deshbord.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TopupComponent } from "./topup/topup.component";
import { BuyComponentComponent } from "./buy-component/buy-component.component";

const routers: Routes = [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {path:'dashboard',
       component:DeshbordComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component:RegisterComponent
      },
      { path:'buy/:id',
        component:BuyComponentComponent,
      }
      
]
@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }