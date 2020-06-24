import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-grafica-p-automatica',
  templateUrl: './grafica-p-automatica.component.html',
  styleUrls: ['./grafica-p-automatica.component.css']
})
export class GraficaPAutomaticaComponent implements OnInit {
public donaChartLabels = ['sales Q1', 'sales Q2','sales Q3','salesQ4'];
public donaChartData = [120,150,180,90];
public donaChartType ='doughnut';
  constructor(private router:Router) { }
  regresar(){
    this.router.navigate([ '/Home']);
   }
  ngOnInit(): void {
  }

}
