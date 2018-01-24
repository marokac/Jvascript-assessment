import { Component, OnInit } from '@angular/core';
import { AppServiceService } from "../app-service.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  Message:any;
  isError:any;
  form: FormGroup;
  constructor(private appService:AppServiceService,private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.isError=false;
    this.buildForm();
  }

register(form){
if(form.password==form.cpassword){
 let body={
  "first_name":form.fname,
  "last_name":form.lname,
  "email":form.email,
  "password":form.password,
 } 
 
console.log(body)

this.appService.register(body).subscribe(result => {
 if(result.Error){
  this.Message=result.Message;
  this.isError=true;
 }
 else{
console.log(result.user.id+"fjyguhiop[]")
 let profile={
  "user_id":result.user.id,
  "bank":form.bank,
  "cardNum":form.cardNum,
  "exparyDate":form.exparyDate,
  "cvc":form.cvc,
 }
 this.Message=result.Message;
 this.appService.createprofile(profile).subscribe(result1=>{
   this.appService.emitChange(result1.acount);
   console.log("account created"+JSON.stringify(result1.acount))
 });
 setTimeout(this.router.navigate(['dashboard']),5000)
 
 }
});
}
  else{
    this.Message="password do not match";
  }
}

buildForm(){
  this.form = this.fb.group({
    fname: [''],
    lname: ['',Validators.email],
    email: [''],
    password:[''],
    cpassword:[''],
    bank:[''],
    cardNum:[''],
    exparyDate:[''],
    cvc:['']
  });
}
}
