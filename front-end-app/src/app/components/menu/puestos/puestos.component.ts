import { DialogoPuestoComponent } from './../../emergentes/menu/dialogo-puesto/dialogo-puesto.component';
import { PuestosService } from './../../../services/puestos.service';
import { DatosPuestos } from './../../../models/puestos';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';

declare var $:any;

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {
  displayedColumns: string[] = ['TxtPuesto', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosPuestos>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private puestosService: PuestosService
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarPuestos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarPuestos(){
    this.spinner.show();
    this.puestosService.ServicioObtenerPuestos().subscribe(resultado =>{
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
    error =>{
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
    });
  }

  eliminarPuesto(puesto: DatosPuestos){
    this.dialogo.open(DialogoConfirmacionComponent, {
        data: `eliminar especialidad '${puesto.TxtPuesto}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.puestosService.ServerEliminarPuesto(puesto).subscribe(resultado =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                this.Mensaje(`Especialidad '${puesto.TxtPuesto}' eliminada`, 2, 1, 3);
                this.cargarPuestos();
                
                this.spinner.hide();
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
          this.Mensaje("No se ha realizado ninguna accion", 3, 1, 1);
        }
      });
  }

  agregarPuesto(){
    this.dialogo.open(DialogoPuestoComponent).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Especialidad ' ${resultado} ' ingresada exitosamente`, 2, 1, 3);
        this.cargarPuestos();
      }
      else{
        this.Mensaje("No se ha realizado ninguna accion", 3, 1, 1);
      }
    });
  }

  actualizarPuesto(puesto: DatosPuestos){
    this.dialogo.open(DialogoPuestoComponent, {
      data: puesto.IdPuesto
    }).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Empleado '${puesto.TxtPuesto}' modificado exitosamente`, 2, 1, 3);
        this.cargarPuestos();
      }
      else{
        this.Mensaje("No se ha realizado ninguna accion", 3, 1, 1);
      }
    });
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
