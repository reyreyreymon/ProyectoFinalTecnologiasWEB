import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../service/crud/crud.service';
@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {
  productos:any;
  Datos=this.productos;
  constructor(public datos: CrudService) {
    
   }



   barChartOptions={
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
 barChartLabels= [];
 barChartType='bar';
 barChartLegend=true;
 barChartData=[{
  data:[], label:'datos1', backgroundColor: "rgba(220,220,220,0.5)"
}

];
  
  ngOnInit(): void {
    this.datos.obtener_Productos()
    .subscribe(data => {
      this.productos = data.map(e => {
        return {
          id: e.payload.doc.id,
         
          descripcion: e.payload.doc.data()['descripcion'],
          marca: e.payload.doc.data()['marca'],
          precio: e.payload.doc.data()['precio'],
          existencia: e.payload.doc.data()['existencia']
       };
       
       
      })
      //for(let i=0;this.productos;i++){
        //this.barChartLabels=this.productos[i].descripcion;
      //}
      console.log(this.productos[0].descripcion);
    });

  

  }
  
  }


