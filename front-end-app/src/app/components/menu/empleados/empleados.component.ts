import { Router } from '@angular/router';
import { DialogoEmpleadoComponent } from './../../emergentes/menu/dialogo-empleado/dialogo-empleado.component';
import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosEmpleado } from 'app/models/empleados';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';

declare var $:any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = [
    'TxtNombres',
    'TxtApellidos',
    'TxtNit',
    'TxtDpi',
    'FechaIngreso',
    'opciones'
  ];
  headers: string[] = [''];
  dataSource: MatTableDataSource<DatosEmpleado>;
  expandedElement: DatosEmpleado | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogo: MatDialog,
    private empleadosService: EmpleadosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    this.spinner.show();
    this.empleadosService.ServicioObtenerEmpleados().subscribe( resultado => {
      if(resultado[0].EstadoToken !== '0'){
        this.dataSource = new MatTableDataSource(resultado);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }
      else{
        this.spinner.hide();
        sessionStorage.setItem("DatosUsuario", "");
        sessionStorage.setItem("SessionStarted", "0");
        this.router.navigate(['/login']);
        this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
      }
    },
    error => {
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
    });
  }

  agregarEmpleado(){
    this.dialogo.open(DialogoEmpleadoComponent).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Empleado ' ${resultado} ' ingresado exitosamente`, 2, 1, 3);
        this.cargarEmpleados();
      }
      else{
        this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
      }
    });
  }

  actualizarEmpleado(empleado: DatosEmpleado){
    this.dialogo.open(DialogoEmpleadoComponent, {
      data: empleado.IdEmpleado
    }).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Empleado '${empleado.TxtNombres} ${empleado.TxtApellidos}' modificado exitosamente`, 2, 1, 3);
        this.cargarEmpleados();
      }
      else{
        this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
      }
    });
  }

  eliminarEmpleado(empleado: DatosEmpleado){
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `eliminar empleado '${empleado.TxtNombres}'`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.empleadosService.ServerEliminarEmpleado(empleado).subscribe(resultado =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                this.Mensaje(`Empleado '${empleado.TxtNombres}' eliminado`, 2, 1, 3);
                this.cargarEmpleados();
              }
              else{
                this.spinner.hide();
                sessionStorage.setItem("DatosUsuario", "");
                sessionStorage.setItem("SessionStarted", "0");
                this.router.navigate(['/login']);
                this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
              }
            }
            else{
              this.Mensaje("Error del servidor", 3, 1, 1);
            }
          },
          error =>{
            this.Mensaje(error.statusText, 4, 1, 1);
          })
        } else {
          this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Mensaje(mensaje: any, color: number, posY:number, posX: number){
    const type = ['','info','success','warning','danger'];
    const from = ['', 'top', 'bottom'];
    const align = ['', 'left', 'center', 'right'];

    $.notify({
        icon: "",
        message: mensaje
    },{
        type: type[color],
        timer: 1000,
        placement: {
            from: from[posY],
            align: align[posX]
        }
    });
  }
}
