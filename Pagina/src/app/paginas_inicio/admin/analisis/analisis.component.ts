import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../../service/crud/crud.service";
import Speech from 'speak-tts';//importamos el lector

@Component({
  selector: "app-analisis",
  templateUrl: "./analisis.component.html",
  styleUrls: ["./analisis.component.css"],
})
export class AnalisisComponent implements OnInit {
  productos: any;
  Datos = this.productos;

  //variables para el lector de pantalla
  result = '';
  speech: any;

  constructor(public datos: CrudService) {
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
      for (let i = 0; this.productos; i++) {
        this.barChartLabels[i] = this.productos[i].descripcion;
        this.barChartData[0].data[i] = this.productos[i].existencia;
      }
      //this.barChartData.data=this.arreglo;
    });
  }
}
