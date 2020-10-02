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

declare var $:any;

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

  constructor(
  
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private ServiciosService : ServiciosService
  ) { }

  ngOnInit(): void {
    this.cargarServicios();
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
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
        this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
      }
    },
    error =>{
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
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
                this.Mensaje(`Usuario '${servicio.TxtServicio}' eliminado`, 2, 1, 3);
                this.cargarServicios();
                
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
          this.Mensaje("No se ha realizado ninguna acción", 3, 1, 1);
        }
      });
  }
  agregarServicio(){
    this.dialogo.open(DialogoServicioComponent).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Servicio ' ${resultado} ' ingresado exitosamente`, 2, 1, 3);
        this.cargarServicios();
      }
      else{
        this.Mensaje("No se ha realizado ninguna acción", 3, 1, 1);
      }
    });
  }

  actualizarServicio(servicio: DatosServicios){
    this.dialogo.open(DialogoServicioComponent, {
      data: servicio.IdServicio
    }).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Servicio '${servicio.TxtServicio} ' modificado exitosamente`, 2, 1, 3);
        this.cargarServicios();
      }
      else{
        this.Mensaje("No se ha realizado ninguna acción", 3, 1, 1);
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
