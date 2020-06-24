import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styleUrls: ['./grafica-barras.component.css']
})
export class GraficaBarrasComponent implements OnInit {
  //--------------------------
  public barChartOptions={
      scaleShowVerticalLines: false,
      responsive: true,
      elements: {
        rectangle: {
            borderWidth: 1,
            borderColor: "rgb(0,255,0)",
            borderSkipped: 'bottom'
        }
    }
     };
  //--------------------------------
  public barChartLabels= [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto"];
  public barChartType='bar';
  public barChartLegend=true;
  public barChartData=[{
    data:[4, 7, 5 , 7, 6, 8, 1, 2], label:'datos1', backgroundColor: "rgba(220,220,220,0.5)"
  },
  { data: [2, 6, 2 , 5, 3, 9, 4, 7], label : "datos22", backgroundColor: "rgba(220,220,220,0.5)"}
];
//--------------------------------
  constructor(private router:Router) { }
  regresar(){
    this.router.navigate([ '/Home']);
   }
  ngOnInit(): void {
   

  }

}
