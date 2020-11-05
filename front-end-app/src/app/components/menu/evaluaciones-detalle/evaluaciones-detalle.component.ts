import { ExporterService } from 'app/services/exporter.service';
import { Menu } from './../../../models/usuarios';
import { DialogoConfirmacionComponent } from './../../emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosEvaluacionDetalle } from 'app/models/evaluaciones-detalle';
import { EvaluacionesDetalleService } from 'app/services/evaluaciones-detalle.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { DialogoEvaluacionDetalleComponent } from 'app/components/emergentes/menu/dialogo-evaluacion-detalle/dialogo-evaluacion-detalle.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluaciones-detalle',
  templateUrl: './evaluaciones-detalle.component.html',
  styleUrls: ['./evaluaciones-detalle.component.css']
})
export class EvaluacionesDetalleComponent implements OnInit {
  displayedColumns: string[] = ['TxtTipoDeEvaluacion', 'TxtFactor', 'TxtSubFactor', 'Anio', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosEvaluacionDetalle>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;
  acceso = false;
  filtrado: boolean = false;

  constructor(
    private evaluacionesDetalleService: EvaluacionesDetalleService,
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
    this.cargarEvaluacionesDetalle();
  }

  cargarEvaluacionesDetalle(){
    this.spinner.show();
    this.evaluacionesDetalleService.ServicioObtenerEvaluacionesDetalle().subscribe(resultado =>{
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

  eliminarEvaluacionDetalle(evaluacionDetalle: DatosEvaluacionDetalle){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar la evaluacion detalle`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.evaluacionesDetalleService.ServerEliminarEvaluacionDetalle(evaluacionDetalle).subscribe(resultado =>{
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
    this.dialogo.open(DialogoEvaluacionDetalleComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion detalle registrada exitosamente`);
        this.cargarEvaluacionesDetalle();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarEvaluacionDetalle(evaluacionDetalle: DatosEvaluacionDetalle){
    this.dialogo.open(DialogoEvaluacionDetalleComponent, {
      data: evaluacionDetalle.IdEvaluacionDetalle
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion detalle modificada exitosamente`);
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
      this.exporterService.exportToExel(this.dataSource.filteredData, 'Evaluaciones detalle');  
    }
    else{
      this.exporterService.exportToExel(this.dataSource.data, 'Evaluaciones detalle');
    }
    this.spinner.hide();
  }
}
