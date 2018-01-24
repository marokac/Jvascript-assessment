import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppServiceService } from "../app-service.service";
import { Router } from "@angular/router";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.scss']
})
export class TopupComponent implements OnInit {
  @Input() data: any
  form: FormGroup;
  accountData:any;
  message:any;
  showError:boolean
  success:boolean;
  constructor(private fb:FormBuilder,private appService:AppServiceService,private router:Router,private appComponent:AppComponent) { 
   
  }

  ngOnInit() {
    alert(JSON.stringify(this.data))
    this.showError=false;
    this.success=false;
    this.accountData=this.appService.getaccountData();
    this.buildForm();
    this.form.controls['bank'].setValue(this.data.bank)
    this.form.controls['cardNum'].setValue(this.data.cardNum)
  }
  toup(form){
    var newbalance=form.amount+this.data.balance;
    var body={
      "balance":newbalance
    }
   this.appService.uptadeBalance(this.data.a_id,body).subscribe(result=>{
     console.log(result);
     if(result.Error){
       this.showError=true;
      this.message=result.Message;
     }
     else{
       this.success=true;
       this.message=result.Message;
     }
   })

  }

  close(){
    this.appComponent.closeTopup();
    setTimeout(this.router.navigate(['dashboard']),5000)
  }
buildForm(){
  this.form = this.fb.group({
    amount: [''],
    bank:[''],
    cardNum:[''],
  });
}
}
