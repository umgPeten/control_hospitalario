import { Menu } from './../../../models/usuarios';
import { DialogoServicioComponent } from './../../emergentes/menu/dialogo-servicio/dialogo-servicio.component';
import { ServiciosService } from './../../../services/servicios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatosServicios } from 'app/models/servicios';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2'
import { Location } from '@angular/common';

// declare var $:any;

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  displayedColumns: string[] = ['TxtServicio', 'FechaIngreso',  'opciones'];
  dataSource: MatTableDataSource<DatosServicios>;
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;
  acceso = false;

  constructor(
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private ServiciosService : ServiciosService,
    location: Location,
  ) { 
    this.location = location;
  }

  ngOnInit(): void {
    this.verificarPermisos();
    this.cargarServicios();
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
      this.router.navigate(['/usuarios']);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cargarServicios(){
    this.spinner.show();
    this.ServiciosService.ServicioObtenerServicios().subscribe(resultado =>{
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


  eliminarServicio(servicio: DatosServicios){
  
     
    this.dialogo.open(DialogoConfirmacionComponent, {
        data: `eliminar servicio '${servicio.TxtServicio}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.ServiciosService.ServerEliminarServicio(servicio).subscribe(resultado =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                // this.Mensaje(`Usuario '${servicio.TxtServicio}' eliminado`, 2, 1, 3);
                this.alert('success', `Servicio '${servicio.TxtServicio}' eliminado`);
                this.cargarServicios();
                
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
  agregarServicio(){
    this.dialogo.open(DialogoServicioComponent).afterClosed().subscribe(resultado => {
      if(resultado){
        // this.Mensaje(`Servicio ' ${resultado} ' ingresado exitosamente`, 2, 1, 3);
        this.alert('success', `Servicio ' ${resultado} ' ingresado exitosamente`);
        this.cargarServicios();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarServicio(servicio: DatosServicios){
    this.dialogo.open(DialogoServicioComponent, {
      data: servicio.IdServicio
    }).afterClosed().subscribe(resultado => {
      if(resultado){
        // this.Mensaje(`Servicio '${servicio.TxtServicio} ' modificado exitosamente`, 2, 1, 3);
        this.alert('success', `Servicio '${servicio.TxtServicio} ' modificado exitosamente`);
        this.cargarServicios();
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

}
