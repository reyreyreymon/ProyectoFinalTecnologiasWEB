import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private http: HttpClient) { }
  enviarMensaje(body) {
    return this.http.post('http://localhost:4200/#/contacto', body);
    console.log("Servicio");
  }
}
