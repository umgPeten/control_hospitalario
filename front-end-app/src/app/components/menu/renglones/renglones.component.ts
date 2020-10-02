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

declare var $:any;

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

  constructor(
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private renglonesService: RenglonesService
  ) { }

  ngOnInit(): void {
    this.cargarRenglones();
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
        this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
      }
    },
    error =>{
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
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
                this.Mensaje(`Usuario '${renglon.TxtRenglon}' eliminado`, 2, 1, 3);
                this.cargarRenglones();
                
                this.spinner.hide();
              }
              else{
                this.spinner.hide();
                sessionStorage.setItem("DatosUsuario", "");
                sessionStorage.setItem("SessionStarted", "0");
                this.router.navigate(['/login']);
                this.Mensaje("Token del usuario activo inválido", 4, 1, 1);
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

  agregarRenglon(){
    this.dialogo.open(DialogoRenglonComponent).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Renglón ' ${resultado} ' ingresado exitosamente`, 2, 1, 3);
        this.cargarRenglones();
      }
      else{
        this.Mensaje("No se ha realizado ninguna acción", 3, 1, 1);
      }
    });
  }

  actualizarRenglon(renglon: DatosRenglones){
    this.dialogo.open(DialogoRenglonComponent, {
      data: renglon.IdRenglon
    }).afterClosed().subscribe(resultado => {
      if(resultado){
        this.Mensaje(`Empleado '${renglon.TxtRenglon}' modificado exitosamente`, 2, 1, 3);
        this.cargarRenglones();
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
