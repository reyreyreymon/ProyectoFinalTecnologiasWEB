import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { Router } from "@angular/router";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string = "";

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  //correo
  onLogin() {
    console.log("email", this.email);
    console.log("pass", this.password);

    this.authService
      .loginEmailUser(this.email, this.password)
      .then((res) => {
        //Dialogo
        this.variables_Dialogo(this.email, "hola");
        this.estado_Creacion = "login_bien";
        this.openDialog();
        //localestorage
        localStorage.setItem("usuario", this.email);
        localStorage.setItem("usuario_logueado", "1");
        //this.router.navigate(["header"]);
      })
      .catch((err) => {
        //Dialogo
        this.variables_Dialogo(err, "hola");
        this.estado_Creacion = "login_error";
        this.openDialog();
        //return;
        console.log("err", err);
      });
  }

  onLoginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((res) => {
        localStorage.setItem("usuario", res.user.email);
        localStorage.setItem("usuario_logueado", "1");
        console.log("resUser", res.user.email);
      });
    this.router.navigate(["/inicio"]);
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
