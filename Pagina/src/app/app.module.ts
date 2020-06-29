import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';

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
import { ProductosComponent } from './paginas_inicio/admin/productos/productos.component';
import {EmpleadosComponent} from "./paginas_inicio/admin/empleados/empleados.component";
import { AnalisisComponent } from './paginas_inicio/admin/analisis/analisis.component';
import { ProductosVComponent } from './paginas_inicio/vendedor/productos-v/productos-v.component';
import { EmpleadosVComponent } from './paginas_inicio/vendedor/empleados-v/empleados-v.component';
import { AnalisisVComponent } from './paginas_inicio/vendedor/analisis-v/analisis-v.component';

import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from "./paginas_inicio/login/login.component";

//Graficas
import {ChartsModule} from 'ng2-charts';

//Servicios
import {CrudService} from "./service/crud/crud.service";
import { MessService } from './service/mensaje/mess.service';

//Firebase
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {environment} from '../environments/environment'
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFirestore} from '@angular/fire/firestore';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';

//Dialogos
import { ConfirmacionComponent } from './dialogos/confirmacion/confirmacion.component';
import { RegistrarComponent } from './paginas_inicio/registrar/registrar.component';

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
    EmpleadosComponent,
    AnalisisComponent,
    ProductosVComponent,
    EmpleadosVComponent,
    AnalisisVComponent,
    ConfirmacionComponent,
    LoginComponent,
    RegistrarComponent
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
    AngularFirestoreModule,
    HttpClientModule,
    ChartsModule,
    AngularFireStorageModule,
    NgxQRCodeModule

    ],
  providers: [CrudService, MessService, AngularFireAuth, AngularFirestore ],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmacionComponent]
})
export class AppModule { }
