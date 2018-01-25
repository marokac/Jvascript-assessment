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
  data=[];
  constructor(private route: ActivatedRoute,private appService:AppServiceService,private router:Router) {
    this.userAccount=this.appService.getaccountData()
    console.log(JSON.stringify(this.userAccount.a_id));
    this.appService.getTransectionsL(this.userAccount.a_id).subscribe(result=>{
      this.buildTransL(result.trans) ,

      console.log(JSON.stringify(this.data));
    })

    }
  ngOnInit() {
    
  }

  buildTransL(trans){
    this.data=[];
    trans.forEach(value => {
      this.data.push(
        {
       "id":value.id,
       "a_id":value.a_id,
       "p_id":value.p_id,
       "total_price":value.total_price,
       "trans_date":value.trans_date
        }
      )
    });
  }

  close(){
    setTimeout(this.router.navigate(['dashboard']),5000)
  }
}
