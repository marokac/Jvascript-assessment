import { Component, OnInit } from '@angular/core';
import { AppServiceService } from "../app-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Message:any;
  isError:any;
  form: FormGroup;
  constructor(private appService:AppServiceService,private fb: FormBuilder,private router: Router) {

  }

  ngOnInit() {
    this.isError=false;
    this.buildForm();
  }
  login(form){
     let body={
      "email":form.email,
      "password":form.password,
     } 
    console.log(body)
    
    this.appService.login(body).subscribe(result => {
     if(result.Error){
      this.Message=result.success;
      this.isError=true;
     }
     else{
	    this.appService.getAccByUserId(result.user.id).subscribe(data=>{
        if(result.Error){
          this.Message=result.Message;
          this.isError=true;
         }
         else{
          this.appService.emitChange(data.acount);
          setTimeout(this.router.navigate(['dashboard']),5000)
         }
   });
   
     }
    });
 
    
	}
  buildForm(){
    this.form = this.fb.group({
      email: ['',],
      password:['',],
    });
  
  }
  register(){
    setTimeout(this.router.navigate(['register']),5000)
  }
}
