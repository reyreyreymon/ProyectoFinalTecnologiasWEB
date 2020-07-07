import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../../service/crud/crud.service";
import Speech from "speak-tts"; //importamos el lector
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}

@Component({
  selector: "app-analisis-v",
  templateUrl: "./analisis-v.component.html",
  styleUrls: ["./analisis-v.component.css"],
})
export class AnalisisVComponent implements OnInit {
  //variables para el lector de pantalla
  result_Lector = "";
  speech: any;

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  //productos
  productos: any;
  productos_local = [
    {
      id: "",
      descripcion: "",
      marca: "",
      precio: null,
      existencia: null,
    },
  ];
  productos_encontrados1 = [
    {
      id: "",
      descripcion: "",
      marca: "",
      precio: null,
      existencia: null,
    },
  ];
  productos_encontrados2 = [
    {
      id: "",
      descripcion: "",
      marca: "",
      precio: null,
      existencia: null,
    },
  ];
  productos_encontrados = [
    {
      id: "",
      descripcion: "",
      marca: "",
      precio: null,
      existencia: null,
    },
  ];
  buscar2: string; //input
  sihay2: boolean = false;
  buscar1: string; //input
  sihay1: boolean = false;

  //variables para buscar por precio
  buscar3: number;
  buscar4: number;
  sihay3: boolean = false;

  constructor(public datos: CrudService, public dialog: MatDialog) {
    //Iniciamos lec de pantalla
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log("speech synthesis supported");
      this.speech
        .init({
          volume: 1,
          lang: "es-MX",
          rate: 1,
          pitch: 1,
          voice: "Google UK English Male",
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log("Event voiceschanged", voices);
            },
          },
        })
        .then((data) => {
          // The "data" object contains the list of available voices and the voice synthesis params
          console.log("Lector está listo", data);
          data.voices.forEach((voice) => {
            console.log(voice.name + " " + voice.lang);
          });
        })
        .catch((e) => {
          console.error("Ocurrió un error al inicializar: ", e);
        });
    }
  } //cierra constructor

  //comenzar lector
  start() {
    var temporalDivElement = document.createElement("div");
    //leemos lo que esta en el id readNow
    temporalDivElement.innerHTML = document.getElementById("readNow").innerHTML;
    //validamos cualquier tipo de texto (con estilos o no)
    this.result_Lector =
      temporalDivElement.textContent || temporalDivElement.innerText || "";

    this.speech
      .speak({
        text: this.result_Lector,
      })
      .then(() => {
        console.log("Exito");
      })
      .catch((e) => {
        console.error("Ocurrió un error:", e);
      });
  }

  //detener lector
  pause() {
    this.speech.pause();
  }

  //Renaudamos el lector
  resume() {
    this.speech.resume();
  }

  ngOnInit(): void {
    //Para mostrar los empleados, obtenemos el arreglo
    this.datos.obtener_Productos().subscribe((data) => {
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
      //obtenemos la variable de forma local
      this.productos_local = this.productos;
    });
    this.sihay2 = false;
  }

  buscarProducto_Nombre() {
    this.sihay2 = false;
    let j = 0;
    for (let i = 0; i < this.productos_local.length; i++) {
      if (this.buscar2 == this.productos_local[i]["descripcion"]) {
        this.sihay2 = true;
        this.productos_encontrados1[j++] = this.productos_local[i];
      }
    }
    if (this.sihay2 == false) {
      this.buscar2 = "";
      //Dialogo
      this.estado_Creacion = "producto_no_encontrado";
      this.openDialog();
      return;
    }
  }

  buscarProducto_Marca() {
    this.sihay1 = false;
    let j = 0;
    for (let i = 0; i < this.productos_local.length; i++) {
      if (this.buscar1 == this.productos_local[i]["marca"]) {
        this.sihay1 = true;
        this.productos_encontrados2[j++] = this.productos_local[i];
      }
    }
    if (this.sihay1 == false) {
      this.buscar1 = "";
      //Dialogo
      this.estado_Creacion = "producto_no_encontrado";
      this.openDialog();
      return;
    }
  }

  buscarProducto_Existencia() {
    this.sihay3 = false;
    let j = 0;
    for (let i = 0; i < this.productos_local.length; i++) {
      if (this.buscar3 <= this.productos_local[i]["existencia"] && this.buscar4 >= this.productos_local[i]["existencia"]) {
        this.sihay3 = true;
        this.productos_encontrados[j++] = this.productos_local[i];
      }
    }
    if (this.sihay3 == false) {
      this.buscar3 = null;
      this.buscar4 = null;
      //Dialogo
      this.estado_Creacion = "producto_no_encontrado";
      this.openDialog();
      return;
    }
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
