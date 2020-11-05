import { ExporterService } from 'app/services/exporter.service';
import { Menu } from 'app/models/usuarios';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosEvaluacionEncabezado } from 'app/models/evaluaciones-encabezado';
import { EvaluacionesEncabezadoService } from 'app/services/evaluaciones-encabezado.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { DialogoEvaluacionEncabezadoComponent } from 'app/components/emergentes/menu/dialogo-evaluacion-encabezado/dialogo-evaluacion-encabezado.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluaciones-encabezado',
  templateUrl: './evaluaciones-encabezado.component.html',
  styleUrls: ['./evaluaciones-encabezado.component.css']
})
export class EvaluacionesEncabezadoComponent implements OnInit {
  displayedColumns: string[] = ['TxtTipoDeEvaluacion', 'Anio', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosEvaluacionEncabezado>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;
  acceso = false;
  filtrado: boolean = false;

  constructor(
    private evaluacionesEncabezadoService: EvaluacionesEncabezadoService,
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
    this.cargarEvaluacionesEncabezado();
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

  cargarEvaluacionesEncabezado(){
    this.spinner.show();
    this.evaluacionesEncabezadoService.ServicioObtenerEvaluacionesEncabezado().subscribe(resultado =>{
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

  eliminarEvaluacionEncabezado(evaluacionEncabezado: DatosEvaluacionEncabezado){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar la evaluacion encabezado con el tipo de evaluacion '${evaluacionEncabezado.TxtTipoDeEvaluacion}'`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.evaluacionesEncabezadoService.ServerEliminarEvaluacionEncabezado(evaluacionEncabezado).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `Evaluacion encabezado con el tipo de evaluacion '${evaluacionEncabezado.TxtTipoDeEvaluacion}' eliminada`);
              this.cargarEvaluacionesEncabezado();
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

  agregarEvaluacionEncabezado(){
    this.dialogo.open(DialogoEvaluacionEncabezadoComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion encabezado ' ${resultado} ' registrada exitosamente`);
        this.cargarEvaluacionesEncabezado();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarEvaluacionEncabezado(evaluacionEncabezado: DatosEvaluacionEncabezado){
    this.dialogo.open(DialogoEvaluacionEncabezadoComponent, {
      data: evaluacionEncabezado.IdEvaluacionEncabezado
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion encabezado '${evaluacionEncabezado.TxtTipoDeEvaluacion}' modificada exitosamente`);
        this.cargarEvaluacionesEncabezado();
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

  imprimirExel(){
    this.spinner.show();
    if(this.filtrado){
      this.exporterService.exportToExel(this.dataSource.filteredData, 'Evaluaciones encabezado');  
    }
    else{
      this.exporterService.exportToExel(this.dataSource.data, 'Evaluaciones encabezado');
    }
    this.spinner.hide();
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
