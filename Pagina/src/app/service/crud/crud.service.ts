import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore, public http:HttpClient) { }

  //-----------------Crud_Empleado-----------------
  crear_Nuevo_Empleado(Record){
    return this.fireservices
    .collection('Empleados')
    .add(Record);
  }

  obtener_Empleados(){
    return this.fireservices
    .collection('Empleados')
    .snapshotChanges();
  }

  actualizar_Empledao(id, record){
    this.fireservices.doc('Empleados/' + id).update(record)
  }

  eliminar_Empleado(id){
    this.fireservices.doc('Empleados/' + id).delete();
  }
  //-----------------Crud_Empleado_FIN-----------------


  //-----------------Crud_Productos-----------------

  AltaProd(Record) {
    return this.http.post('https://us-central1-papeleria-f3646.cloudfunctions.net/alta', Record);
  }
  mostrarBD(){
    return this.http.get('https://us-central1-papeleria-f3646.cloudfunctions.net/consulta');
  }
  EliminarProd(id) {
    return this.http.post('https://us-central1-papeleria-f3646.cloudfunctions.net/eliminar', id);
  }
  crear_Nuevo_Producto(Record){
    return this.fireservices
    .collection('Productos')
    .add(Record);
  }

  obtener_Productos(){
    return this.fireservices
    .collection('Productos')
    .snapshotChanges();
  }

  actualizar_Producto(id, record){
    this.fireservices.doc('Productos/' + id).update(record)
  }

  eliminar_Producto(id){
    this.fireservices.doc('Productos/' + id).delete();
  }
  //-----------------Crud_Productos_FIN-----------------

}
