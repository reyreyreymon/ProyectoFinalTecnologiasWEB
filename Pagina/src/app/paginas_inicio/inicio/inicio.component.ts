import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"],
})
export class InicioComponent implements OnInit {
  members: any[] = [];
  //localstorage
  usuario: string = "";
  usuario_logueado: string = "0";
  tipo_user: string = "";

  constructor() {}

  ngOnInit() {
    //localstorage
    //recuperamos datos
    this.usuario = localStorage.getItem("usuario");
    console.log(this.usuario);
    this.tipo_user = localStorage.getItem("tipo_usuario");
    //console.log(this.tipo_user);
    this.usuario_logueado = localStorage.getItem("usuario_logueado");
    console.log(this.usuario_logueado);
  }
}
