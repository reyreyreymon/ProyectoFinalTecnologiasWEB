import { ObsService } from './../../service/obs/obs.service';
import { Router } from "@angular/router";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";


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
  usuario_logueado: string = "0";
  tipo_user: string = "";
  tipo_usuario: string;

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
    private observa: ObsService
  ) {
  }

  ngOnInit() {
    this.observa.actuliza$.subscribe( data => {
       //localstorage
       //recuperamos datos
       this.usuario = localStorage.getItem("usuario");
       console.log(this.usuario);
       this.tipo_user = localStorage.getItem("tipo_usuario");
       //console.log(this.tipo_user);
       this.usuario_logueado = localStorage.getItem("usuario_logueado");
       console.log("Nuevo cambio");
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
  onLogout() {
    //Dialogo
    this.variables_Dialogo("salio", "hola");
    this.estado_Creacion = "logout";
    this.openDialog();

    this.afAuth.auth.signOut();

    localStorage.setItem("usuario", "");
    localStorage.setItem("tipo_usuario", "");
    localStorage.setItem("usuario_logueado", "0");
    //this.router.navigate(["/inicio"]);
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
