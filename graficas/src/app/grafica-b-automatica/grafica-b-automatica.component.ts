import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-grafica-b-automatica',
  templateUrl: './grafica-b-automatica.component.html',
  styleUrls: ['./grafica-b-automatica.component.css']
})
export class GraficaBAutomaticaComponent implements OnInit {
public radarChartLabels = ['Q1','Q2','Q3','Q4'];
public radarChartData = [{data: [120,130,180,70],label:'2017'},
{data:[90,150,200,45],label:'2018'}];
public radarChartType ='radar';
  constructor(private router:Router) { }
  regresar(){
    this.router.navigate([ '/Home']);
   }
  ngOnInit(): void {
  }

}
