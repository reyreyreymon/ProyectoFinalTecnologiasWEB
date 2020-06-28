import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {

  //localstorage
  usuario:string="";
  usuario_logueado:string="0";
  tipo_user:string = "";

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    //localstorage
    //recuperamos datos
    this.usuario = localStorage.getItem("usuario");
    console.log(this.usuario);
    this.tipo_user = localStorage.getItem("tipo_usuario");
    //console.log(this.tipo_user);
    this.usuario_logueado =  localStorage.getItem("usuario_logueado");
    console.log("header",this.usuario_logueado);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout() {
    this.afAuth.auth.signOut();
    localStorage.setItem("usuario", "");
    localStorage.setItem("tipo_usuario", "");
    localStorage.setItem("usuario_logueado","0");
    //this.router.navigate(["/inicio"]);
  }
}
