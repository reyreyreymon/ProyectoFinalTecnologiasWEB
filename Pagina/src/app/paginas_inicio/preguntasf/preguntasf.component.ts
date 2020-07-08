import { ObsService } from './../../service/obs/obs.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import Speech from 'speak-tts';//importamos el lector

@Component({
  selector: 'app-preguntasf',
  templateUrl: './preguntasf.component.html',
  styleUrls: ['./preguntasf.component.css']
})
export class PreguntasfComponent implements OnInit {
   //variables para el lector de pantalla
   result_Lector = '';
   speech: any;

  constructor(private abs: ObsService) { 
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
  }

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

  ngOnInit(): void {
    this.abs.actuliza$.emit("");
  }

}
