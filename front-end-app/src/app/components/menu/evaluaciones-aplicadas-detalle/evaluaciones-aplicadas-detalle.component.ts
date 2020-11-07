import { ExporterService } from 'app/services/exporter.service';
import { Menu } from './../../../models/usuarios';
import { DialogoEvaluacionAplicadaDetalleComponent } from 'app/components/emergentes/menu/dialogo-evaluacion-aplicada-detalle/dialogo-evaluacion-aplicada-detalle.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosEvaluacionAplicadaDetalle } from 'app/models/evaluaciones-aplicadas-detalle';
import { EvaluacionesAplicadasDetalleService } from 'app/services/evaluaciones-aplicadas-detalle.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluaciones-aplicadas-detalle',
  templateUrl: './evaluaciones-aplicadas-detalle.component.html',
  styleUrls: ['./evaluaciones-aplicadas-detalle.component.css']
})
export class EvaluacionesAplicadasDetalleComponent implements OnInit {
  displayedColumns: string[] = ['TxtEmpleado', 'TxtEvaluacionEncabezado', 'TxtFactor', 'DblPunteoTotal', 'DblPunteo', 'TxtEscalaDeCalificacion', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosEvaluacionAplicadaDetalle>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;
  acceso = false;
  filtrado: boolean = false;

  constructor(
    private evaluacionesAplicadasDetalleService: EvaluacionesAplicadasDetalleService,
    private spinner: NgxSpinnerService,
    public dialogo: MatDialog,
    private router: Router,
    location: Location,
    private exporterService: ExporterService,
    ) { 
      this.location = location;
    }

  ngOnInit(): void {
    this.verificarPermisos();
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarEvaluacionesAplicadasDetalle();
  }

  verificarPermisos(){
    var path = this.location.prepareExternalUrl(this.location.path());
    this.menu = JSON.parse(sessionStorage.getItem("Menu"));

    for(let item of this.menu){
      item.TxtLink = '/'+item.TxtLink;
      if(item.TxtLink === path){
        this.permisos = item;
        this.acceso = true;
        break;
      }
    }

    if(this.acceso){
      
    }
    else{
      this.router.navigate(['/usuarios']);
    }
  }

  cargarEvaluacionesAplicadasDetalle(){
    this.spinner.show();
    this.evaluacionesAplicadasDetalleService.ServicioObtenerEvaluacionesAplicadasDetalle().subscribe(resultado =>{
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

  EliminarEvaluacionAplicadaDetalle(EvaluacionAplicadaDetalle: DatosEvaluacionAplicadaDetalle){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar la evaluacion aplicada detalle`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.evaluacionesAplicadasDetalleService.ServerEliminarEvaluacionAplicadaDetalle(EvaluacionAplicadaDetalle).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `Evaluacion aplicada detalle eliminada`);
              this.cargarEvaluacionesAplicadasDetalle();
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

  agregarEvaluacionAplicadaDetalle(){
    this.dialogo.open(DialogoEvaluacionAplicadaDetalleComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion aplicada detalle registrada exitosamente`);
        this.cargarEvaluacionesAplicadasDetalle();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarEvaluacionAplicadaDetalle(EvaluacionAplicadaDetalle: DatosEvaluacionAplicadaDetalle){
    this.dialogo.open(DialogoEvaluacionAplicadaDetalleComponent, {
      data: EvaluacionAplicadaDetalle.IdEvaluacionAplicadaDetalle
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion aplicada detalle modificada exitosamente`);
        this.cargarEvaluacionesAplicadasDetalle();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filtrado = true;

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

  imprimirExel(){
    this.spinner.show();
    if(this.filtrado){
      this.exporterService.exportToExel(this.dataSource.filteredData, 'Evaluaciones aplicadas detalle');  
    }
    else{
      this.exporterService.exportToExel(this.dataSource.data, 'Evaluaciones aplicadas detalle');
    }
    this.spinner.hide();
  }
}
