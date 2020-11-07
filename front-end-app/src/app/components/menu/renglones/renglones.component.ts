import { ExporterService } from 'app/services/exporter.service';
import { Menu } from './../../../models/usuarios';
import { DialogoRenglonComponent } from './../../emergentes/menu/dialogo-renglon/dialogo-renglon.component';
import { RenglonesService } from './../../../services/renglones.service';
import { DatosRenglones } from './../../../models/renglones';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2'
import { Location } from '@angular/common';

// declare var $:any;

@Component({
  selector: 'app-renglones',
  templateUrl: './renglones.component.html',
  styleUrls: ['./renglones.component.css']
})
export class RenglonesComponent implements OnInit {
  displayedColumns: string[] = ['TxtRenglon', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosRenglones>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;
  acceso = false;
  filtrado: boolean = false;

  constructor(
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private renglonesService: RenglonesService,
    location: Location,
    private exporterService: ExporterService,
  ) { 
    this.location = location;
  }

  ngOnInit(): void {
    this.verificarPermisos();
    this.cargarRenglones();
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filtrado = true;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarRenglones(){
    this.spinner.show();
    this.renglonesService.ServicioObtenerRenglones().subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.dataSource = new MatTableDataSource(resultado);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.allUsers = resultado;
        
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
    });
  }

  eliminarRenglon(renglon: DatosRenglones){
    this.dialogo.open(DialogoConfirmacionComponent, {
        data: `eliminar renglon '${renglon.TxtRenglon}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.renglonesService.ServerEliminarRenglon(renglon).subscribe(resultado =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                // this.Mensaje(`Usuario '${renglon.TxtRenglon}' eliminado`, 2, 1, 3);
                this.alert('success', `Renglon '${renglon.TxtRenglon}' eliminado`);
                this.cargarRenglones();
                
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
        } else {
          this.alert('info', "No se ha realizado ninguna accion");
        }
      });
  }

  agregarRenglon(){
    this.dialogo.open(DialogoRenglonComponent).afterClosed().subscribe(resultado => {
      if(resultado){
        // this.Mensaje(`Renglón ' ${resultado} ' ingresado exitosamente`, 2, 1, 3);
        this.alert('success', `Renglón ' ${resultado} ' ingresado exitosamente`);
        this.cargarRenglones();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarRenglon(renglon: DatosRenglones){
    this.dialogo.open(DialogoRenglonComponent, {
      data: renglon.IdRenglon
    }).afterClosed().subscribe(resultado => {
      if(resultado){
        // this.Mensaje(`Empleado '${renglon.TxtRenglon}' modificado exitosamente`, 2, 1, 3);
        this.alert('success', `Empleado '${renglon.TxtRenglon}' modificado exitosamente`);
        this.cargarRenglones();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
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
      this.exporterService.exportToExel(this.dataSource.filteredData, 'Renglones');  
    }
    else{
      this.exporterService.exportToExel(this.dataSource.data, 'Renglones');
    }
    this.spinner.hide();
  }
}
