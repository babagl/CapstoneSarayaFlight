import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/bookingList/",data);
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/bookingList/")
  }
  putProduct(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/bookingList/"+ id, data)

  }
  deleteProduct(id :number){
    return this.http.delete("http://localhost:3000/bookingList/"+id)
  }
}
