import { Component, OnInit } from '@angular/core';

import {DataApiService} from '../../../services/data-api.service';
import {BookInterface} from '../../../models/book';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi:DataApiService) { }
  private books: BookInterface = [];
 // private books: BookInterface = {};

  ngOnInit(): void {
    this.getListBooks();
  }

  getListBooks(){
    this.dataApi.getAllBooks().subscribe( book =>{
      this.books = book;
    });
   
  }

  onDeleteBook(idBook:string){
   // console.log('DELETE BOOK', idBook);
    const confirmacion =confirm('Seguro de querer eliminarlo?');
    if(confirmacion){
      this.dataApi.deleteBook(idBook);
    }
    
  }

onPreUpdateBook(book: BookInterface){
  console.log('BOOK', book);
  this.dataApi.selectedBook = Object.assign({}, book);
}

}


