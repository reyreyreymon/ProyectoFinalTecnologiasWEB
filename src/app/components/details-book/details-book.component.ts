import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {BookInterface} from '../../models/book';

import{ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {


  constructor(private dataApi: DataApiService, private route:ActivatedRoute) { }

  public book: BookInterface = {};

  ngOnInit(): void {
   // const idBook = '1yYhL2evUY6EsipkR8Ir';
   const idBook = this.route.snapshot.params['id']; //para extraer el parametro id, se necesitó importar ActivatedRoute y Params
   this.getDetails(idBook);
   /* 
   this.dataApi.getOneBook(idBook).subscribe(book => {
      console.log('Detalles book', book);
    });
    */
  }

  getDetails(idBook:string): void{
    this.dataApi.getOneBook(idBook).subscribe(book =>{
      //console.log('Detalles book', book)
      this.book = book;
    })
  }

}
