import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppServiceService } from "../app-service.service";

@Component({
  selector: 'app-buy-component',
  templateUrl: './buy-component.component.html',
  styleUrls: ['./buy-component.component.scss']
})
export class BuyComponentComponent implements OnInit {

  id: number;
  private sub: any;
  data:any;
  discount:any
  totalPrice:any;
  userAccount:any;
  isError:boolean;
  success:boolean;
  message:any
  constructor(private route: ActivatedRoute,private appService:AppServiceService,private router:Router) {
  this.userAccount=this.appService.getaccountData()
  console.log(JSON.stringify(this.userAccount.balance));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.appService.getProdById(this.id).subscribe(result=>{
      alert(JSON.stringify(result.data));
      this.data=result.data;
      this.calculateDiscount(this.data.price)
      this.totalPrice=this.data.price-this.discount;
      })
   });

   this.isError=false;
   this.success=false;
  }

  calculateDiscount(price){

    if(price<=100){
      this.discount=0;
    }
    if(price>=112&&price<=115){
      this.discount=price*25/100;
     }
    if(price<=100){
            
      }
       if(price>120){
       this.discount=price*25/100;
     }
  
  }
  makeTrans(){
    let body={
      "a_id":this.userAccount.a_id,
      "p_id":this.id,
      "total_price":this.totalPrice,
    }
    if(this.totalPrice>this.userAccount.balance){
      this.isError=true;
      this.message="You dont have enough balance for this transection";
    }
    else{
    this.appService.makeTransection(body).subscribe(result=>{
    if(result.Error){
      this.isError=true;
      this.message=result.Message;

    }
    else{
	   var newbalance=this.userAccount.balance-this.totalPrice;
	   let body1={
	   "balance":newbalance
	   }
	   this.appService.uptadeBalance(this.userAccount.a_id,body1).subscribe(result=>{
     console.log("balance uptaded");
     console.log('balance', result)
	   });
      this.message=result.Message;
      
      this.success=true;
    }
    })
  }
  }
  close(){
    setTimeout(this.router.navigate(['dashboard']),5000)
  }
  
  
}
