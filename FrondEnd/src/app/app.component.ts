import { Component } from '@angular/core';
import { AppServiceService } from "./app-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account:any;
  user:any;
  loggedin:boolean;
  getRoute:boolean;
constructor(private appService:AppServiceService,private router:Router){

  this.appService.changeEmitted$.subscribe(
    childAction => {
      this.processChildAction(childAction)
      this.appService.setaccountData(childAction)
    });
    
}
ngOnInit(){
  this.loggedin=false;
  this.getRoute=true;
 }
 processChildAction(action){
  this.loggedin=true;
  this.account=action;
  console.log(this.account)
  this.appService.getUserById(this.account.user_id).subscribe(result=>{  

   this.user=result.user;
  })
 }
 topup(){
  this.appService.setaccountData(this.account)
  this.getRoute=false;
 }
 public closeTopup(){
  this.getRoute=true;
 }
}
