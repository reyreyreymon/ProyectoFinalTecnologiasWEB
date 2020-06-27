import { Component, OnInit, Inject } from "@angular/core";
import { CrudService } from "../../../service/crud/crud.service";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.css"],
})
export class EmpleadosComponent implements OnInit {
  //variables del empleado
  empleados: any;
  empleado_nombe: string;
  empleado_apellido: string;
  empleado_ano: number;
  empleado_puesto: string;
  empleado_salario: number;

  editable: boolean = false;
  mensaje: string; //alta

  form;

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  puesto:string;

  constructor(
    public crudService: CrudService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = formBuilder.group({
      empleado_nombe1: ["", Validators.required],
      empleado_apellido1: ["", Validators.required],
      empleado_ano1: ["", [Validators.required]],
      empleado_salario1: ["", Validators.required],
      empleado_puesto1: ["", Validators.required],
    });
  }

  submit() {
    //this.estado_Creacion = 'empleado_no_creado';
    //this.openDialog();
    this.crearEmpleado();
    //this.estado_Creacion = '';
  }

  crearEmpleado() {
    let Record = {};
    Record["nombre"] = this.empleado_nombe;
    Record["apellido"] = this.empleado_apellido;
    Record["ano"] = this.empleado_ano;
    Record["puesto"] = this.empleado_puesto;
    Record["salario"] = this.empleado_salario;
    if (
      this.empleado_nombe === "" ||
      this.empleado_apellido === "" ||
      this.empleado_ano === null ||
      this.empleado_nombe === "" ||
      this.empleado_puesto === "" ||
      this.empleado_salario == null
    ) {
      //Dialogo
      this.estado_Creacion = "empleado_no_creado";
      this.openDialog();
      return;
    }
    this.crudService
      .crear_Nuevo_Empleado(Record)
      .then((res) => {
        this.empleado_nombe = "";
        this.empleado_apellido = "";
        this.empleado_ano = null;
        this.empleado_puesto = "";
        this.empleado_salario = null;
        console.log(res);
        //Dialogo
        this.variables_Dialogo(this.empleado_nombe, this.empleado_apellido);
        this.estado_Creacion = "empleado_creado";
        this.openDialog();
      })
      .catch((error) => {
        //Dialogo
        this.estado_Creacion = "empleado_no_creado";
        this.openDialog();

        console.log(error);
      });
  }

  ngOnInit(): void {
    //Para mostrar los empleados, obtenemos el arreglo
    this.crudService.obtener_Empleados().subscribe((data) => {
      this.empleados = data.map((e) => {
        return {
          id: e.payload.doc.id,
          editable: false,
          nombre: e.payload.doc.data()["nombre"],
          apellido: e.payload.doc.data()["apellido"],
          ano: e.payload.doc.data()["ano"],
          puesto: e.payload.doc.data()["puesto"],
          salario: e.payload.doc.data()["salario"],
        };
      });
      console.log(this.empleados);
    });
  }

  editarEmpledao(Record) {
    Record.editable = true;
    Record.editnombre = Record.nombre;
    Record.editapellido = Record.apellido;
    Record.editano = Record.ano;
    Record.editpuesto = Record.puesto;
    Record.editsalario = Record.salario;
  }

  actualizarEmpleado(item) {
    let Record = {};
    Record["nombre"] = item.editnombre;
    Record["apellido"] = item.editapellido;
    Record["ano"] = item.editano;
    Record["puesto"] = item.editpuesto;
    Record["salario"] = item.editsalario;
    //variables para el dialogo
    this.variables_Dialogo(item.editnombre, item.editapellido);
    //mandamos al servicio.
    this.crudService.actualizar_Empledao(item.id, Record);
    //bloqueamos los input para que ya no sean editables.
    item.editable = false;
    //dialogo
    this.estado_Creacion = "empleado_actualizado";
    this.openDialog();
  }

  borrarEmpleado(id) {
    this.crudService.eliminar_Empleado(id);
    //Dialogo
    this.estado_Creacion = "empleado_eliminado";
    this.openDialog();
  }

  //dialogos de informacion
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      height: "265px",
      width: "400px",
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
