import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../../service/crud/crud.service";
@Component({
  selector: "app-analisis",
  templateUrl: "./analisis.component.html",
  styleUrls: ["./analisis.component.css"],
})
export class AnalisisComponent implements OnInit {
  productos: any;
  Datos = this.productos;
  constructor(public datos: CrudService) {}

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      rectangle: {
        borderWidth: 1,
        borderColor: "rgb(0,255,0)",
        borderSkipped: "bottom",
      },
    },
  };
  //--------------------------------
  barChartLabels: any = [];
  barChartType = "bar";
  barChartLegend = true;
  barChartData: any = [
    {
      data: [],
      label: "existencias",
      backgroundColor: "rgba(220,220,220,0.5)",
    },
  ];
  arreglo: any = [];
  ngOnInit(): void {
    this.datos.obtener_Productos().subscribe((data) => {
      this.productos = data.map((e) => {
        return {
          id: e.payload.doc.id,

          descripcion: e.payload.doc.data()["descripcion"],
          marca: e.payload.doc.data()["marca"],
          precio: e.payload.doc.data()["precio"],
          existencia: e.payload.doc.data()["existencia"],
        };
      });
      for (let i = 0; this.productos; i++) {
        this.barChartLabels[i] = this.productos[i].descripcion;
        this.barChartData[0].data[i] = this.productos[i].existencia;
      }
      //this.barChartData.data=this.arreglo;
    });
  }
}
