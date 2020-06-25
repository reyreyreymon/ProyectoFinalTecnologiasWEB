import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email:string = '';
  public password:string ='';

  uploadPercent:Observable<number>;
  urlImage:Observable<string>;

  constructor(private router:Router, private authService:AuthService, public afAuth:AngularFireAuth, private storage:AngularFireStorage) {

   }
@ViewChild('imageUser') inputImageUser: ElementRef;
  ngOnInit(): void {
  }
  //método para agregar un usuario
  onAddUser(){
    this.authService.registerUser(this.email, this.password).then((res)=>{
      this.authService.isAuth().subscribe(user => {
        if(user){
          user.updateProfile({
            displayName: 'Nombre',
            photoURL: this.inputImageUser.nativeElement.value
          }).then( function (){
            console.log('USER UPDATED');
          }).catch(function(error){
            console.log('error', error);
          });
        }
      })
      this.router.navigate(['admin/list-books']);
    }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle(){
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((res)=>{
      console.log('resUser', res);
    })
    this.router.navigate(['admin/list-books']);
  }
  
  //subir la imagen al fireStorage
  onUpload(e){
    //console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2); //genera un id para la imagen
    const file = e.target.files[0]; //toma la info de la imagen, creo
    const filePath =`upload/profile_${id}`; //se asigna ruta y nombre donde se guardará dentro de localtorage
    const ref = this.storage.ref(filePath); //No recuerdo para que sirve
    const task = this.storage.upload(filePath, file); //Aqui es donde se sube la imagen, lleva como parametros la ruta y el nombre

    this.uploadPercent=task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=>this.urlImage=ref.getDownloadURL())).subscribe();
  }

}
