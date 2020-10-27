import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosEscalaDeCalificacion } from 'app/models/escalasDeCalificacion';
import { EscalasDeCalificacionService } from 'app/services/escalas-de-calificacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-escala-de-calificacion',
  templateUrl: './escala-de-calificacion.component.html',
  styleUrls: ['./escala-de-calificacion.component.css']
})
export class EscalaDeCalificacionComponent implements OnInit {
  displayedColumns: string[] = ['TxtSubFactor', 'TxtFactor', 'TxtDescripcion', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosEscalaDeCalificacion>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private escalasDeCalificacionService: EscalasDeCalificacionService,
    private spinner: NgxSpinnerService,
    public dialogo: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarEscalasDeCalificacion();
  }

  cargarEscalasDeCalificacion(){
    this.spinner.show();
    this.escalasDeCalificacionService.ServicioObtenerEscalasDeCalificacion().subscribe(resultado =>{
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

  eliminarEscalaDeCalificacion(escalaDeCalificacion: DatosEscalaDeCalificacion){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar la escala de calificaion '${escalaDeCalificacion.TxtEscalaDeCalificacion}'`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.escalasDeCalificacionService.ServerEliminarEscalaDeCalificacion(escalaDeCalificacion).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `Escala de calificacion '${escalaDeCalificacion.TxtEscalaDeCalificacion}' eliminado`);
              this.cargarEscalasDeCalificacion();
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

  agregarSubFactor(){
    // this.dialogo.open(DialogoSubFactoresComponent).afterClosed().subscribe(resultado =>{
    //   if(resultado){
    //     this.alert('success', `Escalas de calificacion ' ${resultado} ' ingresado exitosamente`);
    //     this.cargarEscalasDeCalificacion();
    //   }
    //   else{
    //     this.alert('info', "No se ha realizado ninguna accion");
    //   }
    // });
  }

  actualizarSubFactro(escalasDeCalificacion: DatosEscalaDeCalificacion){
    // this.dialogo.open(DialogoSubFactoresComponent, {
    //   data: escalasDeCalificacion.IdEscalaDeCalificacion
    // }).afterClosed().subscribe(resultado =>{
    //   if(resultado){
    //     this.alert('success', `Escala de calificacion '${escalasDeCalificacion.TxtEscalaDeCalificacion}' modificado exitosamente`);
    //     this.cargarEscalasDeCalificacion();
    //   }
    //   else{
    //     this.alert('info', "No se ha realizado ninguna accion");
    //   }
    // });
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
