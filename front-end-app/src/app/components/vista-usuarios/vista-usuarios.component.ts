import { DialogoModificarComponent } from './../emergentes/dialogo-modificar/dialogo-modificar.component';
import { DialogoConfirmacionComponent } from '../emergentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { DatosUsuarios } from '../../models/usuarios';
import { UsuariosServiceService } from '../../services/usuarios/usuarios-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAgregarUsuarioComponent } from '../emergentes/dialog-agregar-usuario/dialog-agregar-usuario.component';

declare var $:any;

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.component.html',
  styleUrls: ['./vista-usuarios.component.css']
})
export class VistaUsuariosComponent implements OnInit {
  allUsers: DatosUsuarios;
  IdUser = {
      IdUsuario: 0
    };

  constructor(
    private usuariosService: UsuariosServiceService,
    public dialogo: MatDialog
  ) { }

  ngOnInit(): void {
    this.allUsers = new DatosUsuarios;
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuariosService.ServerObtenerUsuarios().subscribe(resultado =>{
      this.allUsers = resultado;
    },
    error =>{
      console.log(error);
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
