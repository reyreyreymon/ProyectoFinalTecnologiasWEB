import { Component, OnInit } from '@angular/core';
import { CrudService } from "../../../service/crud/crud.service";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: any;
  empleado_nombe: string;
  empleado_apellido: string;
  empleado_ano: number;
  empleado_puesto: string;
  empleado_salario: number;

  editable:boolean = false;
  mensaje: string;//alta

  constructor(public crudService:CrudService) { }

  crearEmpleado(){
    let Record ={};
    Record['nombre'] = this.empleado_nombe;
    Record['apellido'] = this.empleado_apellido;
    Record['ano'] = this.empleado_ano;
    Record['puesto'] = this.empleado_puesto;
    Record['salario'] = this.empleado_salario;

    this.crudService.crear_Nuevo_Empleado(Record)
    .then(res =>{
      this.empleado_nombe = "";
      this.empleado_apellido = "";
      this.empleado_ano = null;
      this.empleado_puesto = "";
      this.empleado_salario = null;

      console.log(res);
      this.mensaje = "Empleado creado correctamente"
    }).catch(error =>{
      console.log(error);
    });
  }

  ngOnInit(): void {
    //Para mostrar los empleados, obtenemos el arreglo
    this.crudService.obtener_Empleados()
    .subscribe(data => {
      this.empleados = data.map(e => {
        return {
          id: e.payload.doc.id,
          editable:false,
          nombre: e.payload.doc.data()['nombre'],
          apellido: e.payload.doc.data()['apellido'],
          ano: e.payload.doc.data()['ano'],
          puesto: e.payload.doc.data()['puesto'],
          salario: e.payload.doc.data()['salario']
        };
      })
      console.log(this.empleados);
    });
  }

  editarEmpledao(Record){
    Record.editable = true;
    Record.editnombre = Record.nombre;
    Record.editapellido = Record.apellido;
    Record.editano = Record.ano;
    Record.editpuesto = Record.puesto;
    Record.editsalario = Record.salario;
  }

  actualizarEmpleado(item){
    let Record ={};
    Record['nombre'] = item.editnombre;
    Record['apellido'] = item.editapellido;
    Record['ano'] = item.editano;
    Record['puesto'] = item.editpuesto;
    Record['salario'] = item.editsalario;
    //mandamos al servicio.
    this.crudService.actualizar_Empledao(item.id,Record);
    //bloqueamos los input para que ya no sean editables.
    item.editable = false;
  }

  borrarEmpleado(id){
    this.crudService.eliminar_Empleado(id);
  }

}
