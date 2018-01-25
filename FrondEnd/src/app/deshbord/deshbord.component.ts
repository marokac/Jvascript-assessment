import { Component, OnInit } from '@angular/core';
import { AppServiceService } from "../app-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-deshbord',
  templateUrl: './deshbord.component.html',
  styleUrls: ['./deshbord.component.scss']
})
export class DeshbordComponent implements OnInit {
data=[];
buy:boolean;
  constructor(private appService:AppServiceService,private router: Router) { }

  ngOnInit() {
    this.buy=false;
    this.appService.getProducts().subscribe(result => {
    console.log(result);
    this.buildproduct(result.result);

    })
  }

  buildproduct(response){
    this.data=[];
    response.forEach(value => {
      this.data.push({ p_id:value.p_id,
       name:value.name,
       description:value.description,
       price:value.price,
       discount_price:value.discound_price,
       picture:value.picture})
    });
    console.log(JSON.stringify(this.data)+"i am data")
  }

  buyProd(id){
    this.router.navigate(['/buy', id]);
  }
  
}
