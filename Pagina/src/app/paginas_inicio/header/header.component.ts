import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { Router} from "@angular/router";
import { CrudService } from "../../service/crud/crud.service";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";
import { ObsService } from './../../service/obs/obs.service';
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
  //localstorage
  usuario: string = "";
  usuario_logueado: string = "2";
  tipo_user: string = "supervisor";
  tipo_usuario:string;

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

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
    private obse: ObsService
  ) {
  }

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

    this.obse.actuliza$.subscribe( data => {
      //localstorage
      //recuperamos datos
      this.usuario = localStorage.getItem("usuario");
      console.log(this.usuario);
      this.tipo_user = localStorage.getItem("tipo_usuario");
      //console.log(this.tipo_user);
      this.usuario_logueado = localStorage.getItem("usuario_logueado");
      console.log("Nuevo cambio");
   });

/*
    let tipo = "", correo = "";
    for (let i = 0; i < this.empleados_local.length; i++) {
      tipo = this.empleados_local[i]["puesto"];
      correo = this.empleados_local[i]["correo"];
      if (tipo === this.tipo_usuario && correo ===this.usuario) {
        this.tipo_user = tipo;
        return;
      }
    }
    */

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
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
