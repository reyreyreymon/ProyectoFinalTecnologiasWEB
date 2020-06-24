import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartsModule} from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficaBarrasComponent } from './grafica-barras/grafica-barras.component';
import { GraficaPastelComponent } from './grafica-pastel/grafica-pastel.component';
import { GraficaBAutomaticaComponent } from './grafica-b-automatica/grafica-b-automatica.component';
import { GraficaPAutomaticaComponent } from './grafica-p-automatica/grafica-p-automatica.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GraficaBarrasComponent,
    GraficaPastelComponent,
    GraficaBAutomaticaComponent,
    GraficaPAutomaticaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
