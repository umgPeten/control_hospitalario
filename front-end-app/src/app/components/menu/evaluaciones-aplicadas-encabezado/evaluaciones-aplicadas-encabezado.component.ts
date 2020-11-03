import { EvaluacionesAplicadasEncabezadoService } from './../../../services/evaluaciones-aplicadas-encabezado.service';
import { DatosEvaluacionAplicadaEncabezado } from 'app/models/evaluaciones-aplicadas-encabezado';
import { DialogoEvaluacionAplicadaEncabezadoComponent } from 'app/components/emergentes/menu/dialogo-evaluacion-aplicada-encabezado/dialogo-evaluacion-aplicada-encabezado.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-evaluaciones-aplicadas-encabezado',
  templateUrl: './evaluaciones-aplicadas-encabezado.component.html',
  styleUrls: ['./evaluaciones-aplicadas-encabezado.component.css']
})
export class EvaluacionesAplicadasEncabezadoComponent implements OnInit {
  displayedColumns: string[] = ['TxtTipoDeEvaluacion', 'TxtFactor', 'TxtSubFactor', 'Anio', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosEvaluacionAplicadaEncabezado>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private evaluacionesAplicadasEncabezadoService: EvaluacionesAplicadasEncabezadoService,
    private spinner: NgxSpinnerService,
    public dialogo: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarEvaluacionesDetalle();
  }

  cargarEvaluacionesDetalle(){
    this.spinner.show();
    this.evaluacionesAplicadasEncabezadoService.ServicioObtenerEvaluacionesAplicadasEncabezado().subscribe(resultado =>{
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
        this.alert('info', "Token del usuario activo invalido");
      }
    },
    error =>{
      this.spinner.hide();
      this.alert('error',error.statusText);
    })
  }

  eliminarEvaluacionDetalle(evaluacionAplicadaEncabezado: DatosEvaluacionAplicadaEncabezado){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar la evaluacion aplicada encabezado`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.evaluacionesAplicadasEncabezadoService.ServerEliminarEvaluacionAplicadaEncabezado(evaluacionAplicadaEncabezado).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `Evaluacion detalle eliminada`);
              this.cargarEvaluacionesDetalle();
              this.spinner.hide();
            }
            else{
              this.spinner.hide();
              sessionStorage.setItem("DatosUsuario", "");
              sessionStorage.setItem("SessionStarted", "0");
              this.router.navigate(['/login']);
              this.alert('info', "Token del usuario activo invalido");
            }
          }
          else{
            this.alert('error', "Error del servidor");
          }
        },
        error =>{
          this.alert('error',error.statusText);
        })
      }
      else {
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  agregarEvaluacionDetalle(){
    this.dialogo.open(DialogoEvaluacionAplicadaEncabezadoComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion aplicada encabezado registrada exitosamente`);
        this.cargarEvaluacionesDetalle();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarEvaluacionDetalle(evaluacionAplicadaEncabezado: DatosEvaluacionAplicadaEncabezado){
    this.dialogo.open(DialogoEvaluacionAplicadaEncabezadoComponent, {
      data: evaluacionAplicadaEncabezado.IdEvaluacionAplicadaEncabezado
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion aplicada encabezado modificada exitosamente`);
        this.cargarEvaluacionesDetalle();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
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

  alert(icon: any, title: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: title
    })
  }
}
