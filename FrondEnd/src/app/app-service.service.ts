import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const requestContentType = 'application/x-www-form-urlencoded';
const headers = new Headers().set('Content-Type', 'application/json; charset=utf-8');
@Injectable()
export class AppServiceService {

  accountData:any;
    private emitChangeSource = new Subject<any>()
  
    changeEmitted$ = this.emitChangeSource.asObservable()

  constructor(private http:Http) { }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
register(body){

  return this.http.post("/api/add_user",JSON.stringify(body)).map((result: Response) => {
    const response = result.json();
    return response;
  })
}

login(body){
  return this.http.post("/api/login",JSON.stringify(body)).map((result: Response) => {
    console.log(result)
    const response = result.json();
    return response;
  })
}

getProducts(){
  return this.http.get("/api/products").map((result: Response) => {
    console.log(result)
    const response = result.json();
    return response;
  })
}
createprofile(body){
  return this.http.post("/api/createAcc",JSON.stringify(body)).map((result: Response) => {
    console.log(result)
    const response = result.json();
    return response;
  })
}
getUserById(id){

  return this.http.get("/api/getUserById/"+id).map((result: Response) => {
    console.log(result)
    const response = result.json();
    return response;
  })
}

setaccountData(data){
this.accountData=data;
}
getaccountData(){
  return this.accountData;
}

uptadeBalance(id,body){
  return this.http.put("/api/update_account/"+id,body).map((result: Response) => {
    console.log(result)
    const response = result.json();
    return response;
  //'/update_account/:id'
})
}

getProdById(id){
  return this.http.get("/api/getProductById/"+id).map((result: Response) => {
    console.log(result)
    const response = result.json();
    return response;
})
}

makeTransection(body){
  return this.http.post("/api/add_trans",JSON.stringify(body)).map((result: Response) => {
    console.log(result)
    const response = result.json();
    return response;
})

}
}