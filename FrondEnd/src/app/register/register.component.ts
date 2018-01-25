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
  isError:boolean;
  form: FormGroup;
  errorMessage:any;
   formStatus = {
    formErrors: {
	   'fname': '',
       'lname': '',
       'email': '',
       'password': '',
	   'cpassword': '',
	   'bank': '',
	   'cardNum': '',
	   'exparyDate': '',
	   'cvc': '',
    },
    submitClicked: false
  };
   validationMessages: object = {}
   
  constructor(private appService:AppServiceService,private fb: FormBuilder,private router: Router) {

 this.validationMessages = {
              'fname': { 'required':"First name is required"},
              'lname': {'required': "Last Name is required"},
              'email': { 'required': "Email is required"},
			  'password':{ 'required': "password is required"},
	          'cpassword': { 'required': "cpassword is required"},
			  'bank':{ 'required': "bank is required"},
			  'cardNum': { 'required': "cardNum is required"},
			  'exparyDate': { 'required': "exparyDate is required"},
	          'cvc': { 'required': "cvc is required"},
              };
			  
		// this.form.valueChanges.subscribe(data => this.onValueChanged(data))
    //     this.onValueChanged()  

  }

  ngOnInit() {
 
    this.isError=false;
    this.buildForm();
  }

register(form){
this.markAllAsDirty();
 if(this.form.valid){

 let body={
  "first_name":form.fname,
  "last_name":form.lname,
  "email":form.email,
  "password":form.password,
 } 
 
console.log(body)
if(form.password==form.cpassword){
this.appService.register(body).subscribe(result => {
 if(result.Error){
  this.isError=true;
  this.errorMessage=result.Message;
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
  this.isError=true;
  this.errorMessage="password dont match";
}
}
else{
  this.isError=true;
}
}

buildForm(){
  this.form = this.fb.group({
    fname: ['',[Validators.required]],
    lname: ['',[Validators.required]],
    email: ['',[Validators.required]],
    password:['',[Validators.required]],
    cpassword:['',[Validators.required]],
    bank:['',[Validators.required]],
    cardNum:['',[Validators.required]],
    exparyDate:['',[Validators.required]],
    cvc:['',[Validators.required]]
  });
  this.form.valueChanges.subscribe(data => this.onValueChanged(data))
  this.onValueChanged() // (re)set validation messages now
}

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form

    // tslint:disable-next-line:forin
    for (const field in this.formStatus.formErrors) {
      // clear previous error message (if any)
      this.formStatus.formErrors[field] = ''
      const control = form.get(field)

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field]
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formStatus.formErrors[field] += messages[key] + ' '
          this.errorMessage= this.formStatus.formErrors[field];
        }
      }
    }
  }

 markAllAsDirty() {
    // Mark all fields as dirty to trigger validation
    for (const key in this.form.controls) {
      if (key) { this.form.controls[key].markAsDirty() }
    }
    this.onValueChanged();
  }

  close(){
    setTimeout(this.router.navigate(['dashboard']),5000)
  }
}
