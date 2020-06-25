import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(public http:HttpClient) { }

/*
  public carga(){
    this.http.get()
  }
*/
}
