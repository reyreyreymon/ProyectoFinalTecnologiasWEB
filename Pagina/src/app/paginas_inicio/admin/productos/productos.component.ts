import { ObsService } from './../../../service/obs/obs.service';
import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../../service/crud/crud.service";
import { FormBuilder, Validators } from "@angular/forms";
import {  MatDialog} from "@angular/material/dialog";
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import Speech from 'speak-tts';//importamos el lector

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
  //variables para el lector de pantalla
  result_Lector = '';
  speech: any;

  productos_l:any;

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
    public dialog: MatDialog,
    private abs: ObsService
  ) {
    this.form = formBuilder.group({
      producto_descripcion1: ["", Validators.required],
      producto_marca1: ["", Validators.required],
      producto_precio1: ["", [Validators.required]],
      producto_existencia1: ["", [Validators.required]],
    });

     //Iniciamos lec de pantalla
     this.speech = new Speech() // will throw an exception if not browser supported
     if(this.speech .hasBrowserSupport()) { // returns a boolean
         console.log("speech synthesis supported")
         this.speech.init({
                 'volume': 1,
                 'lang': 'es-MX',
                 'rate': 1,
                 'pitch': 1,
                 'voice':'Google UK English Male',
                 'splitSentences': true,
                 'listeners': {
                     'onvoiceschanged': (voices) => {
                         console.log("Event voiceschanged", voices)
                     }
                 }
         }).then((data) => {
             // The "data" object contains the list of available voices and the voice synthesis params
             console.log("Lector está listo", data)
             data.voices.forEach(voice => {
             console.log(voice.name + " "+ voice.lang)
             });
         }).catch(e => {
             console.error("Ocurrió un error al inicializar: ", e)
         })
     }
  }//cierra constructor

  //comenzar lector
  start(){
    var temporalDivElement = document.createElement("div");
    //leemos lo que esta en el id readNow
    temporalDivElement.innerHTML = document.getElementById("readNow").innerHTML;
    //validamos cualquier tipo de texto (con estilos o no)
    this.result_Lector = temporalDivElement.textContent || temporalDivElement.innerText || "";

      this.speech.speak({
          text: this.result_Lector,
      }).then(() => {
          console.log("Exito")
      }).catch(e => {
          console.error("Ocurrió un error:", e) 
      })
  }

  //detener lector
  pause(){
    this.speech.pause();
  }
  
  //Renaudamos el lector
  resume(){
    this.speech.resume();
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
      this.producto_precio == null ||
      this.producto_existencia == null
    ) {
      //Dialogo
      this.variables_Dialogo(this.producto_descripcion, this.producto_marca);
      this.estado_Creacion = "producto_no_creado";
      this.openDialog();
      return;
    }
    this.crudService.AltaProd(Record).subscribe((res) => {
      this.variables_Dialogo(this.producto_descripcion, this.producto_marca);
      this.producto_descripcion = "";
      this.producto_marca = "";
      this.producto_precio = null;
      this.producto_existencia = null;

      console.log(res);
      //Dialogo
      this.estado_Creacion = "producto_creado";
      this.openDialog();
    });
    /*
    this.crudService
      .crear_Nuevo_Producto(Record)
      .then((res) => {
        this.variables_Dialogo(this.producto_descripcion, this.producto_marca);

        this.producto_descripcion = "";
        this.producto_marca = "";
        this.producto_precio = null;
        this.producto_existencia = null;

        console.log(res);
        //Dialogo
        this.estado_Creacion = "producto_creado";
        this.openDialog();
      })
      .catch((error) => {
        //Dialogo
        this.estado_Creacion = "producto_no_creado";
        this.openDialog();
        console.log(error);
      }); */
  }

  ngOnInit(): void {
       this.abs.actuliza$.emit("");
      //prueba api
       this.crudService.mostrarBD().subscribe((res)=>{
        this.productos_l = this.productos = res;
        console.log('api',res);
      })
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
    //this.crudService.eliminar_Producto(id);
    this.crudService.EliminarProd(id).subscribe((res) => {
      //Dialogo
    this.estado_Creacion = "producto_eliminado";
    this.openDialog();
    });
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
