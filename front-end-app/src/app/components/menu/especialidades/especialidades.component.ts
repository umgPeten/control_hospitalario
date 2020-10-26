import { DialogoEspecialidadComponent } from './../../emergentes/menu/dialogo-especialidad/dialogo-especialidad.component';
import { DatosEspecialidades } from 'app/models/especialidades';
import { EspecialidadesService } from './../../../services/especialidades.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  displayedColumns: string[] = ['TxtEspecialidad', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosEspecialidades>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private especialidadesService: EspecialidadesService
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarEspecialidades();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarEspecialidades(){
    this.spinner.show();
    this.especialidadesService.ServicioObtenerEspecialidades().subscribe(resultado =>{
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
        // this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
        this.alert('info', "Token del usuario activo invalido");
      }
    },
    error =>{
      this.spinner.hide();
      // this.Mensaje(error.statusText, 4, 1, 1);
      this.alert('error',error.statusText);
    });
  }

  eliminarEspecialidad(especialidad: DatosEspecialidades){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent, {
        data: `eliminar especialidad '${especialidad.TxtEspecialidad}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.especialidadesService.ServerEliminarEspecialidad(especialidad).subscribe(resultado =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                // this.Mensaje(`Especialidad '${especialidad.TxtEspecialidad}' eliminada`, 2, 1, 3);
                this.alert('success', `Especialidad '${especialidad.TxtEspecialidad}' eliminada`);
                this.cargarEspecialidades();
                
                this.spinner.hide();
              }
              else{
                this.spinner.hide();
                sessionStorage.setItem("DatosUsuario", "");
                sessionStorage.setItem("SessionStarted", "0");
                this.router.navigate(['/login']);
                // this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
                this.alert('info', "Token del usuario activo invalido");
              }
            }
            else{
              // this.Mensaje("Error del servidor", 3, 1, 1);
              this.alert('error', "Error del servidor");
            }
          },
          error =>{
            // this.Mensaje(error.statusText, 4, 1, 1);
            this.alert('error',error.statusText);
          })
        } 
        else {
          // this.Mensaje("No se ha realizado ninguna accion", 3, 1, 1);
          this.alert('info', "No se ha realizado ninguna accion");
        }
      });
  }

  agregarespecialidad(){
    this.dialogo.open(DialogoEspecialidadComponent).afterClosed().subscribe(resultado => {
      if(resultado){
        // this.Mensaje(`Especialidad ' ${resultado} ' ingresada exitosamente`, 2, 1, 3);
        this.alert('success', `Especialidad ' ${resultado} ' ingresada exitosamente`);
        this.cargarEspecialidades();
      }
      else{
        // this.Mensaje("No se ha realizado ninguna accion", 3, 1, 1);
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarespecialidad(especialidad: DatosEspecialidades){
    this.dialogo.open(DialogoEspecialidadComponent, {
      data: especialidad.IdEspecialidad
    }).afterClosed().subscribe(resultado => {
      if(resultado){
        // this.Mensaje(`Empleado '${especialidad.TxtEspecialidad}' modificado exitosamente`, 2, 1, 3);
        this.alert('success', `Empleado '${especialidad.TxtEspecialidad}' modificado exitosamente`);
        this.cargarEspecialidades();
      }
      else{
        // this.Mensaje("No se ha realizado ninguna accion", 3, 1, 1);
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

  // Mensaje(mensaje: any, color: number, posY:number, posX: number){
  //   const type = ['','info','success','warning','danger'];
  //   const from = ['', 'top', 'bottom'];
  //   const align = ['', 'left', 'center', 'right'];

  //   $.notify({
  //       icon: "",
  //       message: mensaje
  //   },{
  //       type: type[color],
  //       timer: 1000,
  //       placement: {
  //           from: from[posY],
  //           align: align[posX]
  //       }
  //   });
  // }
}
