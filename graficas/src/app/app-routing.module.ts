import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GraficaBAutomaticaComponent} from './grafica-b-automatica/grafica-b-automatica.component';
import { GraficaBarrasComponent} from './grafica-barras/grafica-barras.component';
import {GraficaPAutomaticaComponent} from './grafica-p-automatica/grafica-p-automatica.component';
import {GraficaPastelComponent} from './grafica-pastel/grafica-pastel.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
{path:'Home',component:HomeComponent},
{path:'GP'   ,component:GraficaPastelComponent},
{path:'GB',component:GraficaBarrasComponent},
{path:'GPA'   ,component:GraficaPAutomaticaComponent},
{path: 'GBA'  ,component:GraficaBAutomaticaComponent},
{path:'', pathMatch:'full',redirectTo:'Home'},
  {path:'**', pathMatch:'full',redirectTo:'Homenng'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
