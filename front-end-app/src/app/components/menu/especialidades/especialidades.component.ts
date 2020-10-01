import { EspecialidadesService } from './../../../services/especialidades.service';
import { DatosEspecialidades } from './../../../models/especialidades';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';

declare var $:any;

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
        this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
      }
    },
    error =>{
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
    });
  }

  eliminarEspecialidad(especialidad: DatosEspecialidades){
    this.dialogo.open(DialogoConfirmacionComponent, {
        data: `eliminar especialidad '${especialidad.TxtEspecialidad}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.especialidadesService.ServerEliminarEspecialidad(especialidad).subscribe(resultado =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                this.Mensaje(`Especialidad '${especialidad.TxtEspecialidad}' eliminada`, 2, 1, 3);
                this.cargarEspecialidades();
                
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
          this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
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
