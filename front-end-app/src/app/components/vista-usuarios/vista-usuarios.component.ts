import { DialogoModificarComponent } from './../emergentes/dialogo-modificar/dialogo-modificar.component';
import { DialogoConfirmacionComponent } from '../emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { DatosUsuarios } from '../../models/usuarios';
import { UsuariosServiceService } from '../../services/usuarios/usuarios-service.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAgregarUsuarioComponent } from '../emergentes/dialog-agregar-usuario/dialog-agregar-usuario.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

declare var $:any;

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.component.html',
  styleUrls: ['./vista-usuarios.component.css']
})
export class VistaUsuariosComponent implements OnInit  {
  // allUsers: DatosUsuarios;
  IdUser = {
      IdUsuario: 0
    };
  displayedColumns: string[] = ['TxtNombres', 'TxtDireccion', 'TxtEmail', 'FechaIngreso', 'opciones'];
  dataSource: MatTableDataSource<DatosUsuarios>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private usuariosService: UsuariosServiceService,
    public dialogo: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    // this.allUsers = new DatosUsuarios;
    this.cargarUsuarios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarUsuarios(){
    this.spinner.show();
    this.usuariosService.ServerObtenerUsuarios().subscribe(resultado =>{
      this.spinner.hide();
      this.dataSource = new MatTableDataSource(resultado);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.allUsers = resultado;

    },
    error =>{
      this.spinner.hide();
      this.Mensaje(error.statusText, 4, 1, 1);
    })
  }

  eliminarUsuario(user: DatosUsuarios){
    this.IdUser.IdUsuario = user.IdUsuario;
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: user
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.usuariosService.ServerEliminarUsuario(this.IdUser).subscribe(resultado =>{
            if(resultado !== 0){
              this.Mensaje("Usuario: '" + user.TxtNombres + "' eliminado", 2, 1, 3);
              this.cargarUsuarios();
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

  modificarUsuario(IdUsuario: number){
    this.dialogo.open(DialogoModificarComponent, {
      data: IdUsuario
    }).afterClosed().subscribe((resultado: Boolean) =>{
      if(resultado){
        this.Mensaje("Usuario modificado exitosamente", 2, 1, 3);
        this.cargarUsuarios();
      }
      else{
        this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
      }
    });
  }

  AgregarUsuario(){
    this.dialogo.open(DialogAgregarUsuarioComponent).afterClosed().subscribe((resultado: string) =>{
      if(resultado){
        this.Mensaje("Usuario '" + resultado + "' ingresado exitosamente", 2, 1, 3);
        this.cargarUsuarios();
      }
      else{
        this.Mensaje("No se a realizado ninguna accion", 3, 1, 1);
      }
    })
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
