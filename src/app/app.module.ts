import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AcercaComponent } from './paginas_inicio/acerca/acerca.component';
import { ContactoComponent } from './paginas_inicio/contacto/contacto.component';
import { FooterComponent } from './paginas_inicio/footer/footer.component';
import { HeaderComponent } from './paginas_inicio/header/header.component';
import { InicioComponent } from './paginas_inicio/inicio/inicio.component';
import { NavbarComponent } from './paginas_inicio/navbar/navbar.component';
import { PreguntasfComponent } from './paginas_inicio/preguntasf/preguntasf.component';

import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

//Firebase
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {environment} from '../environments/environment'
import {AngularFirestoreModule} from "@angular/fire/firestore";

//Servicios
import {CrudService} from "./service/crud/crud.service";
import { ProductosComponent } from './paginas_inicio/admin/productos/productos.component';
import { EmpleadosComponent } from './paginas_inicio/admin/empleados/empleados.component';


@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    ContactoComponent,
    FooterComponent,
    HeaderComponent,
    InicioComponent,
    NavbarComponent,
    PreguntasfComponent,
    ProductosComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), //Hacer la  conexion a nuestra base
    AngularFireDatabaseModule,
    AngularFirestoreModule

    ],
  providers: [CrudService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
