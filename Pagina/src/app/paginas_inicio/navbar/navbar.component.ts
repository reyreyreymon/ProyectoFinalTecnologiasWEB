import { ObsService } from './../../service/obs/obs.service';
import { Router } from "@angular/router";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  //localstorage
  usuario: string = "";
  usuario_logueado: string = "2";
  tipo_user: string = "";
  tipo_usuario: string;
  usuarioL: string;

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  admin_login: boolean = true;
  vendedor_login: boolean = true;

  constructor(
    public dialog: MatDialog,
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private observa: ObsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.observa.actuliza$.subscribe( data => {
      //localstorage
      //recuperamos datos
      this.usuarioL = data;
      this.usuario = localStorage.getItem("usuario");
      this.tipo_user = localStorage.getItem("tipo_usuario");
      this.usuario_logueado = localStorage.getItem("usuario_logueado");
   });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
  onLogout() {
    this.afAuth.auth.signOut();
    localStorage.setItem("usuario", "");
    localStorage.setItem("tipo_usuario", "");
    localStorage.setItem("usuario_logueado", "0");
    this.observa.actuliza$.emit("");
    this._snackBar.open("Regresa Pronto", "Adios!",{duration:2000});
  }

  //dialogos de informacion
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      height: "35%",
      width: "50%",
      data: {
        name: this.name,
        animal: this.animal,
        estado: this.estado_Creacion,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }

  variables_Dialogo(nombre: string, apellido: string) {
    this.name = nombre;
    this.animal = apellido;
  }
}
