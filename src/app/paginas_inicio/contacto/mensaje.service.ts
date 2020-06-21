import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private http: HttpClient) { }
  enviarMensaje(body) {
    console.log(body);
    const headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post('/#/contacto', body);
    // return this.http.get('http://localhost:4200/#/contacto', {headers: headers});
  }
}
