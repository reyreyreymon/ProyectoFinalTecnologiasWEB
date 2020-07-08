import { ObsService } from "./../../service/obs/obs.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { Router } from "@angular/router";
import { CrudService } from "../../service/crud/crud.service";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  //para el nombre del usuario logueado
  usuario_nom: boolean = false;
  correo: string;
  //localstorage
  usuario: string = "";
  usuario_logueado: string = "";
  tipo_user: string = "";
  tipo_usuario: string;

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";
  usuarioL: string;

  //variables del empleado
  empleados: any; //servicio
  empleados_local = [
    {
      id: "",
      editable: "",
      nombre: "",
      apellido: "",
      correo: "",
      ano: "",
      puesto: "",
      salario: "",
    },
  ];

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    public crudService: CrudService,
    public dialog: MatDialog,
    private obse: ObsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //obtener los empleados del servicio
    this.crudService.obtener_Empleados().subscribe((data) => {
      this.empleados = data.map((e) => {
        return {
          id: e.payload.doc.id,
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

    this.obse.actuliza$.subscribe((data) => {
      //localstorage
      //recuperamos datos
      this.usuarioL = data;
      this.usuario = localStorage.getItem("usuario");
      this.tipo_user = localStorage.getItem("tipo_usuario");
      this.usuario_logueado = localStorage.getItem("usuario_logueado");
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout() {
    this.afAuth.auth.signOut();
    localStorage.setItem("usuario", "");
    localStorage.setItem("tipo_usuario", "");
    localStorage.setItem("usuario_logueado", "2");
    this.obse.actuliza$.emit("");
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
