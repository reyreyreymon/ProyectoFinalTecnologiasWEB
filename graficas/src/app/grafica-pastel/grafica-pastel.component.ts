import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-grafica-pastel',
  templateUrl: './grafica-pastel.component.html',
  styleUrls: ['./grafica-pastel.component.css']
})
export class GraficaPastelComponent implements OnInit {
  public pieChartOptions={
    scaleShowVerticalLines: false,
    responsive: true,
   };
//--------------------------------
public pieChartLabels= [ "q1","q2","q3","q4"];
public pieChartType='pie';
public pieChartLegend=true;
public pieChartData=[4,7,5,7];
  constructor(private router:Router) { }
  regresar(){
    this.router.navigate([ '/Home']);
   }
  ngOnInit(): void {
  }

}
