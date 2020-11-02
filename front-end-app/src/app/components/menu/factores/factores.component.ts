import { Menu } from './../../../models/usuarios';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FactoresService } from 'app/services/factores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DatosFactores } from 'app/models/factores';
import { DialogoFactoresComponent } from 'app/components/emergentes/dialogo-factores/dialogo-factores.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-factores',
  templateUrl: './factores.component.html',
  styleUrls: ['./factores.component.css']
})
export class FactoresComponent implements OnInit {
  displayedColumns: string[] = ['TxtFactor', 'TxtDescripcion', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosFactores>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;

  constructor(
    private factoresService: FactoresService,
    private spinner: NgxSpinnerService,
    public dialogo: MatDialog,
    private router: Router,
    location: Location,
  ) { 
    this.location = location;
  }

  ngOnInit(): void {
    this.verificarPermisos();
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarFactores();
  }

  verificarPermisos(){
    var path = this.location.prepareExternalUrl(this.location.path());
    this.menu = JSON.parse(sessionStorage.getItem("Menu"));

    for(let item of this.menu){
      item.TxtLink = '/'+item.TxtLink;
      if(item.TxtLink === path){
        this.permisos = item;
      }
    }
  }

  cargarFactores(){
    this.spinner.show();
    this.factoresService.ServicioObtenerFactores().subscribe(resultado => {
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
      this.alert('error',error.statusText);
    });
  }

  eliminarFactor(factor: DatosFactores){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar Factor '${factor.TxtFactor}'`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.factoresService.ServerEliminarFactor(factor).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `Factor '${factor.TxtFactor}' eliminado`);
              this.cargarFactores();
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

  agregarFactor(){
    this.dialogo.open(DialogoFactoresComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Factor ' ${resultado} ' ingresado exitosamente`);
        this.cargarFactores();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarFactro(factor: DatosFactores){
    this.dialogo.open(DialogoFactoresComponent, {
      data: factor.IdFactor
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `Factor '${factor.TxtFactor}' modificado exitosamente`);
        this.cargarFactores();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
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
