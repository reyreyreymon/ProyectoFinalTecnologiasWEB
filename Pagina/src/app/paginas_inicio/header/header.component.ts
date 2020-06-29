import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../../service/login/auth.service";
import { Router } from "@angular/router";
import { CrudService } from "../../service/crud/crud.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  //localstorage
  usuario: string = "";
  usuario_logueado: string = "0";
  tipo_user: string = "";
  tipo_usuario:string;

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
    public crudService: CrudService
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

    //localstorage
    //recuperamos datos
    this.usuario = localStorage.getItem("usuario");
    console.log(this.usuario);
    this.tipo_usuario = localStorage.getItem("tipo_usuario");
    //console.log(this.tipo_user);
    this.usuario_logueado = localStorage.getItem("usuario_logueado");


    let tipo = "", correo = "";
    for (let i = 0; i < this.empleados_local.length; i++) {
      tipo = this.empleados_local[i]["puesto"];
      correo = this.empleados_local[i]["correo"];
      if (tipo === this.tipo_usuario && correo ===this.usuario) {
        this.tipo_user = tipo;
        return;
      }
    }

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout() {
    this.afAuth.auth.signOut();
    localStorage.setItem("usuario", "");
    localStorage.setItem("tipo_usuario", "");
    localStorage.setItem("usuario_logueado", "0");
    //this.router.navigate(["/inicio"]);
  }
}
