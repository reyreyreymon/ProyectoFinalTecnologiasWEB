import { Injectable } from '@angular/core';
//importamos angular fire..
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
//importamos la interface del Book
import {BookInterface} from '../models/book';
//importamos Observable para el manejo de los observables
import { Observable } from 'rxjs';
//importamos map
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  //creamos una variable
  private booksCollection: AngularFirestoreCollection<BookInterface>;
  //Creamos un observable
  private books: Observable<BookInterface[]>
  //
  private bookDoc:AngularFirestoreDocument<BookInterface>;
  private book:Observable<BookInterface>;
//
  public selectedBook:BookInterface={id:null};

  constructor(private afs:AngularFirestore) {
    //vamos a setear la collection
    this.booksCollection = afs.collection<BookInterface>('books'); // books, es el nombre de la coleccion con la que vamos a trabajar
    this.books = this.booksCollection.valueChanges();
   }

  //recupera todos los libros
  getAllBooks(){
    //simplemente con la fucion return this.books; regresa el arreglo
    //pero se implementó todo lo demás para poder obtener el id del libro
    return this.books = this.booksCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as BookInterface;
        data.id =action.payload.doc.id;
        return data;
      });
    }));
  }

  //regresa un sólo libro
  getOneBook(idBook:string){
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`); //Va a la colección de libros y busca la ruta que le pasemos
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  //agrega un libro
  addBook(book: BookInterface):void{

    this.booksCollection.add(book);

  }

  updateBook(book:BookInterface):void{

    let idBook =  book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);

  }

  deleteBook(idBook: string):void{
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }

}
