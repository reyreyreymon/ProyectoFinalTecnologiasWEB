import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../../service/crud/crud.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import {  MatDialog,  MatDialogRef,  MAT_DIALOG_DATA,} from "@angular/material/dialog";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"],
})
export class ProductosComponent implements OnInit {
  productos: any;
  producto_descripcion: string;
  producto_marca: string;
  producto_precio: number;
  producto_existencia: number;

  editable: boolean = false;
  mensaje: string; //alta

  form;


  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  constructor(
    public crudService: CrudService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = formBuilder.group({
      producto_descripcion1: ["", Validators.required],
      producto_marca1: ["", Validators.required],
      producto_precio1: ["", [Validators.required]],
      producto_existencia1: ["", [Validators.required]],
    });
  }

  submit() {
    this.crearProducto();
  }

  crearProducto() {
    let Record = {};
    Record["descripcion"] = this.producto_descripcion;
    Record["marca"] = this.producto_marca;
    Record["precio"] = this.producto_precio;
    Record["existencia"] = this.producto_existencia;

    if (
      this.producto_descripcion === "" ||
      this.producto_marca === "" ||
      this.producto_precio === null ||
      this.producto_existencia === null
    ) {
      //Dialogo
      this.estado_Creacion = "producto_no_creado";
      this.openDialog();
      return;
    }

    this.crudService
      .crear_Nuevo_Producto(Record)
      .then((res) => {
        this.producto_descripcion = "";
        this.producto_marca = "";
        this.producto_precio = null;
        this.producto_existencia = null;

        console.log(res);
        //Dialogo
        this.variables_Dialogo(this.producto_descripcion, this.producto_marca);
        this.estado_Creacion = "producto_creado";
        this.openDialog();
      })
      .catch((error) => {
        //Dialogo
        this.estado_Creacion = "producto_no_creado";
        this.openDialog();
        console.log(error);
      });
  }

  ngOnInit(): void {
    //Para mostrar los prodcutos, obtenemos el arreglo
    this.crudService.obtener_Productos().subscribe((data) => {
      this.productos = data.map((e) => {
        return {
          id: e.payload.doc.id,
          editable: false,
          descripcion: e.payload.doc.data()["descripcion"],
          marca: e.payload.doc.data()["marca"],
          precio: e.payload.doc.data()["precio"],
          existencia: e.payload.doc.data()["existencia"],
        };
      });
      console.log(this.productos);
    });
  }

  editarProducto(Record) {
    Record.editable = true;
    Record.editdescripcion = Record.descripcion;
    Record.editmarca = Record.marca;
    Record.editprecio = Record.precio;
    Record.editexistencia = Record.existencia;
  }

  actualizarProducto(item) {
    let Record = {};
    Record["descripcion"] = item.editdescripcion;
    Record["marca"] = item.editmarca;
    Record["precio"] = item.editprecio;
    Record["existencia"] = item.editexistencia;
    //variables para el dialogo
    this.variables_Dialogo(item.editdescripcion, item.editmarca);
    //mandamos al servicio.
    this.crudService.actualizar_Producto(item.id, Record);
    //bloqueamos los input para que ya no sean editables.
    item.editable = false;
    //dialogo
    this.estado_Creacion = "producto_actualizado";
    this.openDialog();
  }

  borrarProducto(id) {
    this.crudService.eliminar_Producto(id);
    this.estado_Creacion = "producto_eliminado";
    this.openDialog();
  }

  //dialogos de informacion
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: "300px",
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
