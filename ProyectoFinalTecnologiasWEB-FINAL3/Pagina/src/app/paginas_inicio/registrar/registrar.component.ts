import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../service/login/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}

@Component({
  selector: "app-registrar",
  templateUrl: "./registrar.component.html",
  styleUrls: ["./registrar.component.css"],
})
export class RegistrarComponent implements OnInit {
  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  public email: string = "";
  public password: string = "";
  password2: string = "";

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(
    private router: Router,
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  //método para agregar un usuario
  onAddUser() {
    //this._snackBar.open("jola", "joli",{duration:2000});
    if (this.password === this.password2) {
      this.authService
        .registerUser(this.email, this.password)
        .then((res) => {
          this.authService.isAuth().subscribe((user) => {
            if (user) {
              user
                .updateProfile({
                  displayName: "Nombre",
                })
                .then(function () {
                  console.log("USER UPDATED");
                })
                .catch(function (error) {
                  //Dialogo
                  this.variables_Dialogo(error, "hola");
                  this.estado_Creacion = "registrar_error";
                  this.openDialog();
                  console.log("error", error);
                });
            }
          });
          this.router.navigate(["/inicio"]);
        })
        .catch((err) => {
          //Dialogo
          this.variables_Dialogo(err.message, "hola");
          this.estado_Creacion = "registrar_error";
          this.openDialog();
          console.log("err", err.message);
        });
    } else {
      //Dialogo
      this.variables_Dialogo("Error en el correo o contrasena", "hola");
      this.estado_Creacion = "registrar_error";
      this.openDialog();
      this.password2 = "";
      this.password = "";
    }
  }

  onLoginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((res) => {
        console.log("resUser", res);
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
