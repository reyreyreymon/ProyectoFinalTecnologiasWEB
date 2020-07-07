import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MessService {

  constructor(private http: HttpClient) { }
  enviarMensaje(body) {
    return this.http.post('https://us-central1-mi-tiendita-fbc69.cloudfunctions.net/app', body);
    }
}
