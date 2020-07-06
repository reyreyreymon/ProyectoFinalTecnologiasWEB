import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { Router } from "@angular/router";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";
import { CrudService } from "../../service/crud/crud.service";

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

  //empleados
  empleados: any;
  empleados_local = [
    {
      id: "",
      nombre: "",
      apellido: "",
      correo: "",
      ano: "",
      puesto: "",
      salario: "",
    },
  ];

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public crud: CrudService
  ) {}

  ngOnInit(): void {
    //empleados
    this.crud.obtener_Empleados().subscribe((data) => {
      this.empleados = data.map((e) => {
        return {
          id: e.payload.doc.id,
          editable: false,
          nombre: e.payload.doc.data()["nombre"],
          apellido: e.payload.doc.data()["apellido"],
          correo: e.payload.doc.data()["correo"],
          ano: e.payload.doc.data()["ano"],
          puesto: e.payload.doc.data()["puesto"],
          salario: e.payload.doc.data()["salario"],
        };
      });
      //obtenemos la variable de forma local
      this.empleados_local = this.empleados;
      console.log("Local: ", this.empleados_local);
      console.log(this.empleados);
    });
  }

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

        //asignar el nivel dentro de la empresa (supervisor o empleado)
        let nivel = "",
          flag = false;
        for (let i = 0; i < this.empleados_local.length; i++) {
          if (this.email === this.empleados_local[i]["correo"]) {
            nivel = this.empleados_local[i].puesto;
            flag = true;
            console.log("si hay");
          }
        }
        if (flag) {
          //localestorage
          localStorage.setItem("tipo_usuario", nivel);
          localStorage.setItem("usuario", this.email);
          localStorage.setItem("usuario_logueado", "1");
        }else{
          alert("no hay");
        }

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
