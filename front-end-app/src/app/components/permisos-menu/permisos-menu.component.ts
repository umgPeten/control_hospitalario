import { AfterLogin } from 'app/models/usuarios';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuariosServiceService } from 'app/services/usuarios-service.service';
import { Menu, ObtenerMenu } from './../../models/usuarios';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

declare var $:any;

@Component({
  selector: 'app-permisos-menu',
  templateUrl: './permisos-menu.component.html',
  styleUrls: ['./permisos-menu.component.css']
})
export class PermisosMenuComponent implements OnInit {
  obtener: ObtenerMenu;
  usuario: AfterLogin;
  
  displayedColumns: string[] = ['TxtNombre', 'Agregar', 'Modificar/Actualizar', 'Eliminar', 'Consultar', 'Imprimir', 'Aprobar', 'Reversa', 'Finalizar'];
  headers: string[] = ['Agregar', 'Eliminar', 'Consultar', 'Imprimir', 'Aprobar', 'Reversa', 'Finalizar']
  dataSource: MatTableDataSource<Menu>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private usuariosService: UsuariosServiceService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.usuario = new AfterLogin;
    this.obtener = new ObtenerMenu;
    
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.cargarMenu();
  }
  
  cargarMenu(){
    this.spinner.show();

    this.usuario = JSON.parse(sessionStorage.getItem("DatosUsuario"));
    this.obtener.IdModulo = 1;
    this.obtener.TxtToken = this.usuario.TxtToken;

    this.usuariosService.ServerMenuUsuario(this.obtener).subscribe(resultado =>{
      this.dataSource = new MatTableDataSource(resultado);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.spinner.hide();
    },
    error =>{
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
