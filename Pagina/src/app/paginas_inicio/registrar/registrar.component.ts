import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AuthService} from '../../service/login/auth.service';
import {Router} from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public email:string = '';
  public password:string ='';
  password2:string = "";

  uploadPercent:Observable<number>;
  urlImage:Observable<string>;

  constructor(private router:Router, private authService:AuthService, public afAuth:AngularFireAuth, private storage:AngularFireStorage) {}

  ngOnInit(): void {
  }
  //método para agregar un usuario
  onAddUser(){
    if(this.password === this.password2){
      this.authService.registerUser(this.email, this.password).then((res)=>{
        this.authService.isAuth().subscribe(user => {
          if(user){
            user.updateProfile({
              displayName: 'Nombre'
            }).then( function (){
              console.log('USER UPDATED');
            }).catch(function(error){
              console.log('error', error);
            });
          }
        })
        this.router.navigate(['admin/list-books']);
      }).catch(err => console.log('err', err.message));
    }else{
      alert("nel");
      this.password2 = "";
      this.password = "";
    }

  }

  onLoginGoogle(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res)=>{
      console.log('resUser', res);
    })
    this.router.navigate(['admin/list-books']);
  }

}
