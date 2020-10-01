import { RenglonesService } from './../../../services/renglones.service';
import { DatosRenglones } from './../../../models/renglones';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

declare var $:any;

@Component({
  selector: 'app-renglones',
  templateUrl: './renglones.component.html',
  styleUrls: ['./renglones.component.css']
})
export class RenglonesComponent implements OnInit {
  displayedColumns: string[] = ['TxtNombres', 'TxtDireccion', 'TxtEmail', 'FechaIngreso', 'opciones'];
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
