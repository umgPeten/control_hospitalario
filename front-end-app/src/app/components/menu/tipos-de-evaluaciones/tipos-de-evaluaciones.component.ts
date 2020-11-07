import { ExporterService } from 'app/services/exporter.service';
import { Menu } from './../../../models/usuarios';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatosTipoDeEvaluacion } from 'app/models/tipos-de-evaluaciones';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDeEvaluacionesService } from 'app/services/tipos-de-evaluaciones.service';
import Swal from 'sweetalert2';
import { DialogoTiposDeEvaluacionComponent } from 'app/components/emergentes/menu/dialogo-tipos-de-evaluacion/dialogo-tipos-de-evaluacion.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipos-de-evaluaciones',
  templateUrl: './tipos-de-evaluaciones.component.html',
  styleUrls: ['./tipos-de-evaluaciones.component.css']
})
export class TiposDeEvaluacionesComponent implements OnInit {
  displayedColumns: string[] = ['TxtTipoDeEvaluacion', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosTipoDeEvaluacion>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;
  acceso = false;
  filtrado: boolean = false;

  constructor(
    private tiposDeEvaluacionesService: TiposDeEvaluacionesService,
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
    this.cargarTiposDeEvaluacion();
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
      this.router.navigate(['/acceso-denegado']);
    }
  }

  cargarTiposDeEvaluacion(){
    this.spinner.show();
    this.tiposDeEvaluacionesService.ServicioObtenerTiposDeEvaluacionesService().subscribe(resultado =>{
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

  eliminarTipoDeEvaluacion(tipoDeEvaluacion: DatosTipoDeEvaluacion){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar el tipo de evaluacion '${tipoDeEvaluacion.TxtTipoDeEvaluacion}'`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.tiposDeEvaluacionesService.ServerEliminarTipoDeEvaluacion(tipoDeEvaluacion).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `Tipo de evaluacion '${tipoDeEvaluacion.TxtTipoDeEvaluacion}' eliminado`);
              this.cargarTiposDeEvaluacion();
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

  agregarTipoDeEvaluacion(){
    this.dialogo.open(DialogoTiposDeEvaluacionComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Tipo de evaluacion ' ${resultado} ' ingresado exitosamente`);
        this.cargarTiposDeEvaluacion();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarTipoDeEvaluacion(tipoDeEvaluacion: DatosTipoDeEvaluacion){
    this.dialogo.open(DialogoTiposDeEvaluacionComponent, {
      data: tipoDeEvaluacion.IdTipoDeEvaluacion
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Tipo de evaluacion '${tipoDeEvaluacion.TxtTipoDeEvaluacion}' modificado exitosamente`);
        this.cargarTiposDeEvaluacion();
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
      this.exporterService.exportToExel(this.dataSource.filteredData, 'Tipos de evaluaciones');  
    }
    else{
      this.exporterService.exportToExel(this.dataSource.data, 'Tipos de evaluaciones');
    }
    this.spinner.hide();
  }
}
