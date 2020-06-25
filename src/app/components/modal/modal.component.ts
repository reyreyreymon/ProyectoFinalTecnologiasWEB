import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//
import {DataApiService} from "../../services/data-api.service";
import {BookInterface} from "../../models/book";
import {NgForm} from '@angular/forms';

 //


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi:DataApiService) { }

//Esto es como JQuery   $('#btn').click();
@ViewChild('btnClose') btnClose: ElementRef;


  ngOnInit(): void {
  }

  onSaveBook(bookForm: NgForm):void{
    //para ver que onda con el id
    //console.log(bookForm.value.id);

    if(bookForm.value.id==null){
      //guardar un nuevo libro
      this.dataApi.addBook(bookForm.value);
    }else{
      //modificar un libro
      this.dataApi.updateBook(bookForm.value);
    }
    
    //para limpiar el formulario
    bookForm.resetForm();

    //Para cerrar el modal
    this.btnClose.nativeElement.click();
  }


}
