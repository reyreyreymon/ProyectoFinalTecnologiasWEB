import { MensajeService } from './mensaje.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {


  form;
  constructor(private formBuilder: FormBuilder, private mensajeService: MensajeService){
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid){
      console.log(this.form.value);
      /*
      this.mensajeService.enviarMensaje(this.form.value).subscribe(data => {
        console.log(data);
    });*/
    console.log("Sali");
    } else {
      alert('Llena todos los campos');
    }
  }

  // email = new FormControl('', [Validators.required, Validators.email]);
/*
  getErrorMessage() {
    if (this.form.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.email.hasError('email') ? 'Not a valid email' : '';
  }*/

}
