import { ExporterService } from 'app/services/exporter.service';
import { Menu } from './../../../models/usuarios';
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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluaciones-aplicadas-encabezado',
  templateUrl: './evaluaciones-aplicadas-encabezado.component.html',
  styleUrls: ['./evaluaciones-aplicadas-encabezado.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EvaluacionesAplicadasEncabezadoComponent implements OnInit {
  displayedColumns: string[] = ['TxtEmpleado', 'TxtInstitucion', 'DblPunteoTotal', 'FechaDeAplicacion', 'FechaIngreso', 'opciones'];
  headers: string[] = [''];
  dataSource: MatTableDataSource<DatosEvaluacionAplicadaEncabezado>;
  expandedElement: DatosEvaluacionAplicadaEncabezado | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;
  acceso = false;
  filtrado: boolean = false;

  constructor(
    private evaluacionesAplicadasEncabezadoService: EvaluacionesAplicadasEncabezadoService,
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
    this.cargarEvaluacionesAplicadasEncabezado();
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

  cargarEvaluacionesAplicadasEncabezado(){
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

  eliminarEvaluacionAplicadaEncabezado(evaluacionAplicadaEncabezado: DatosEvaluacionAplicadaEncabezado){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar la evaluacion aplicada encabezado`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.evaluacionesAplicadasEncabezadoService.ServerEliminarEvaluacionAplicadaEncabezado(evaluacionAplicadaEncabezado).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `Evaluacion detalle eliminada`);
              this.cargarEvaluacionesAplicadasEncabezado();
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

  agregarEvaluacionAplicadaEncabezado(){
    this.dialogo.open(DialogoEvaluacionAplicadaEncabezadoComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion aplicada encabezado registrada exitosamente`);
        this.cargarEvaluacionesAplicadasEncabezado();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarEvaluacionAplicadaEncabezado(evaluacionAplicadaEncabezado: DatosEvaluacionAplicadaEncabezado){
    this.dialogo.open(DialogoEvaluacionAplicadaEncabezadoComponent, {
      data: evaluacionAplicadaEncabezado.IdEvaluacionAplicadaEncabezado
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Evaluacion aplicada encabezado modificada exitosamente`);
        this.cargarEvaluacionesAplicadasEncabezado();
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
      this.exporterService.exportToExel(this.dataSource.filteredData, 'Permisos');  
    }
    else{
      this.exporterService.exportToExel(this.dataSource.data, 'Permisos');
    }
    this.spinner.hide();
  }
}
