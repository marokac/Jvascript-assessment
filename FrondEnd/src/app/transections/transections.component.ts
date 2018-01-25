import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppServiceService } from "../app-service.service";

@Component({
  selector: 'app-transections',
  templateUrl: './transections.component.html',
  styleUrls: ['./transections.component.scss']
})
export class TransectionsComponent implements OnInit {
  userAccount:any
  data:any
  constructor(private route: ActivatedRoute,private appService:AppServiceService,private router:Router) {
    this.userAccount=this.appService.getaccountData()
    console.log(JSON.stringify(this.userAccount.a_id));
    this.appService.getTransectionsL(this.userAccount.a_id).subscribe(result=>{
         
       console.log(JSON.stringify(result.product));
      
      //  this.buildHistory(result);
        this.data=result.trans.concat(result.pruduct);
          console.log(JSON.stringify(this.data));
    })

    }
  ngOnInit() {
  }

  buildHistory(response){
    this.data=[];
      response.forEach(value => {
      this.data.push({ trans_date:value.trans.trans_date,
       name:value.product.name,
       price:value.product.price,
       discount_price:value.product.discound_price,
       total:value.trans.total_price})
    });
    //console.log(this.data)
  }
}
