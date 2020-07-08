import { ObsService } from './../../service/obs/obs.service';
import { MessService } from './../../service/mensaje/mess.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, Validators} from '@angular/forms';
import Speech from 'speak-tts';//importamos el lector

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  //variables para el lector de pantalla
  result_Lector = '';
  speech: any;

  form;
  bandera = false;
  bandera2 = false;
  bandera3: boolean;
  constructor(private formBuilder: FormBuilder, private mensajeService: MessService, private abs: ObsService){
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
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

  submit() {
    if (this.form.valid){
      this.bandera3 = true;
      console.log(this.form.value);
      this.mensajeService.enviarMensaje(this.form.value).subscribe(() => {
        console.log("Correo enviado");
        this.bandera = false;
        this.bandera2 = true;
        this.bandera3 = false;
        this.form.reset();
    });
      console.log("Sali");
    } else {
      this.bandera = true;
    }
  }



}
