import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../../service/crud/crud.service";
import Speech from 'speak-tts';//importamos el lector
import { ConfirmacionComponent } from "src/app/dialogos/confirmacion/confirmacion.component";
import { MatDialog } from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
  estado: string;
}

@Component({
  selector: "app-analisis",
  templateUrl: "./analisis.component.html",
  styleUrls: ["./analisis.component.css"],
})
export class AnalisisComponent implements OnInit {
  productos: any;
  Datos = this.productos;

  //variables del dialogo
  animal: string;
  name: string;
  estado_Creacion: string = "";

  //-----------------------------------consultas
  //empleados
  empleados: any;
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
  empleados_encontrados = [
    {
      id:  "",
      editable: "",
      nombre: "",
      apellido: "",
      correo: "",
      ano: "",
      puesto: "",
      salario: "",
    },
  ];
  buscar:string; //input
  sihay:boolean=false;

  //productos
  productos_local = [
    {
      id:"",
      descripcion: "",
      marca: "",
      precio: "",
      existencia: ""
    },
  ];
  productos_encontrados = [
    {
      id:"",
      descripcion: "",
      marca: "",
      precio: "",
      existencia: ""
    },
  ];
  buscar2:string; //input
  sihay2:boolean=false;



  //variables para el lector de pantalla
  result = '';
  speech: any;

  constructor(public datos: CrudService, public dialog: MatDialog) {
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

  //consultas
  buscarEmpleado_Nombre(){
    //Para mostrar los empleados, obtenemos el arreglo
    this.datos.obtener_Empleados().subscribe((data) => {
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
    this.sihay=false;

    for(let i =0; i<this.empleados_local.length; i++){
      if(this.buscar === this.empleados_local[i]['nombre']){
        for(let j=0; j<=i; j++){
          this.sihay=true;
          this.empleados_encontrados[j] = this.empleados_local[i];
          break;
        }
      }
    }
    if(this.sihay==false){
      this.buscar="";
      //Dialogo
      //this.variables_Dialogo(this.empleado_nombe, this.empleado_apellido);
      this.estado_Creacion = "empleado_no_encontrado";
      this.openDialog();
      return;
    }
  }

  buscarProducto_Nombre(){
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
    this.sihay2=false;

    for(let i =0; i<this.productos_local.length; i++){
      if(this.buscar2 == this.productos_local[i]['descripcion']){
        for(let j=0; j<=i; j++){
          this.sihay2=true;
          this.productos_encontrados[j] = this.productos_local[i];
          break;
        }
      }
    }
    if(this.sihay2==false){
      this.buscar2="";
      //Dialogo
      //this.variables_Dialogo(this.empleado_nombe, this.empleado_apellido);
      this.estado_Creacion = "producto_no_encontrado";
      this.openDialog();
      return;
    }

  }

  //comenzar lector
  start(){
    var temporalDivElement = document.createElement("div");
    //leemos lo que esta en el id readNow
    temporalDivElement.innerHTML = document.getElementById("readNow").innerHTML;
    //validamos cualquier tipo de texto (con estilos o no)
    this.result = temporalDivElement.textContent || temporalDivElement.innerText || "";

      this.speech.speak({
          text: this.result,
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

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      rectangle: {
        borderWidth: 1,
        borderColor: "rgb(0,255,0)",
        borderSkipped: "bottom",
      },
    },
  };
  //--------------------------------
  barChartLabels: any = [];
  barChartType = "bar";
  barChartLegend = true;
  barChartData: any = [
    {
      data: [],
      label: "existencias",
      backgroundColor: "rgba(220,220,220,0.5)",
    },
  ];

  arreglo: any = [];
  ngOnInit(): void {
    //this.sihay=false;
    //productos
    this.datos.obtener_Productos().subscribe((data) => {
      this.productos = data.map((e) => {
        return {
          id: e.payload.doc.id,

          descripcion: e.payload.doc.data()["descripcion"],
          marca: e.payload.doc.data()["marca"],
          precio: e.payload.doc.data()["precio"],
          existencia: e.payload.doc.data()["existencia"],
        };
      });
      //graficas
      for (let i = 0; this.productos; i++) {
        this.barChartLabels[i] = this.productos[i]["descripcion"];
        this.barChartData[0].data[i] = this.productos[i]["existencia"];
      }
      //this.barChartData.data=this.arreglo;
    });

    //empleados
    this.datos.obtener_Empleados().subscribe((data) => {
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
