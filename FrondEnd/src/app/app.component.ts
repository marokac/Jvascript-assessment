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
  transList:boolean;
constructor(private appService:AppServiceService,private router:Router){
  this.appService.changeEmitted$.subscribe(
    childAction => {
      this.processChildAction(childAction)
      this.appService.setaccountData(childAction)
    }); 
}
ngOnInit(){
  this.loggedin=false;
  this.transList=false;
  this.getRoute=true;
 }
 public processChildAction(action){
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
 transecL(){
  setTimeout(this.router.navigate(['transections']),5000); 
 }
 public closeTopup(){
  this.appService.setaccountData(this.account)
  this.getRoute=true;
 }
 logout(){
 this.loggedin=false;
 setTimeout(this.router.navigate(['dashboard']),5000);

 }
}
