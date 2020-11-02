import { Menu } from './../../../models/usuarios';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosSubFactores } from 'app/models/factores';
import { SubFactoresService } from 'app/services/sub-factores.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DialogoConfirmacionComponent } from 'app/components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2';
import { DialogoSubFactoresComponent } from 'app/components/emergentes/menu/dialogo-sub-factores/dialogo-sub-factores.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-factores',
  templateUrl: './sub-factores.component.html',
  styleUrls: ['./sub-factores.component.css']
})
export class SubFactoresComponent implements OnInit {
  displayedColumns: string[] = ['TxtSubFactor', 'TxtFactor', 'TxtDescripcion', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosSubFactores>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menu: Menu[];
  location: Location;
  permisos: Menu;

  constructor(
    private subFactoresService: SubFactoresService,
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
    this.cargarSubFactores();
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

  cargarSubFactores(){
    this.spinner.show();
    this.subFactoresService.ServicioObtenerSubFactores().subscribe(resultado => {
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
    });
  }

  eliminarSubFactor(subfactor: DatosSubFactores){
    this.spinner.show();
    this.dialogo.open(DialogoConfirmacionComponent,{
      data: `eliminar SubFactor '${subfactor.TxtSubFactor}'`
    }).afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.subFactoresService.ServerEliminarSubFactor(subfactor).subscribe(resultado =>{
          if(resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.alert('success', `SubFactor '${subfactor.TxtSubFactor}' eliminado`);
              this.cargarSubFactores();
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
    this.dialogo.open(DialogoSubFactoresComponent).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `SubFactor ' ${resultado} ' ingresado exitosamente`);
        this.cargarSubFactores();
      }
      else{
        this.alert('info', "No se ha realizado ninguna accion");
      }
    });
  }

  actualizarSubFactro(subfactor: DatosSubFactores){
    this.dialogo.open(DialogoSubFactoresComponent, {
      data: subfactor.IdSubFactor
    }).afterClosed().subscribe(resultado =>{
      if(resultado){
        this.alert('success', `SubFactor '${subfactor.TxtFactor}' modificado exitosamente`);
        this.cargarSubFactores();
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
