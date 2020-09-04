import { AfterLogin } from 'app/models/usuarios';
import { NewUser } from './../../../models/usuarios';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosServiceService } from 'app/services/usuarios/usuarios-service.service';

declare var $:any;

@Component({
  selector: 'app-dialog-agregar-usuario',
  templateUrl: './dialog-agregar-usuario.component.html',
  styleUrls: ['./dialog-agregar-usuario.component.css']
})
export class DialogAgregarUsuarioComponent implements OnInit {
  nuevoUsuario: NewUser;
  comprobarContrasenia: string;
  DatosUsuarioActivo: AfterLogin;

  constructor(
    private usuariosService: UsuariosServiceService,
    public dialogo: MatDialogRef<DialogAgregarUsuarioComponent>
  ) { }

  ngOnInit(): void {
    this.DatosUsuarioActivo = JSON.parse(localStorage.getItem("DatosUsuario"));;
    this.nuevoUsuario = new NewUser;
    this.comprobarContrasenia = '';
  }

  AgregarNuevoUsuario(){
    if(this.comprobar()){
      this.nuevoUsuario.TxtToken = this.DatosUsuarioActivo.TxtToken;
      if((this.nuevoUsuario.TxtPassword === this.comprobarContrasenia) && this.nuevoUsuario.TxtPassword !== ''){
        this.usuariosService.ServerAgregarUsuario(this.nuevoUsuario).subscribe(resultado =>{
          if(resultado[0].EstadoToken !== 0){
            this.dialogo.close(this.nuevoUsuario.TxtNombres + " " + this.nuevoUsuario.TxtApellidos);
          }
          else{
            this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
          }
        },
        error =>{
          this.Mensaje(error.statusText, 4, 1, 1);
        })
      }
      else{
        this.Mensaje("Verificar contraseña", 3, 1, 1);
      }
    }
    else{
      this.Mensaje("Porfavor completar todos los campos", 3, 1, 1);
    }
  }

  comprobar(){
    if(
      this.nuevoUsuario.TxtApellidos &&
      this.nuevoUsuario.TxtNombres &&
      this.nuevoUsuario.TxtDireccion &&
      this.nuevoUsuario.TxtEmail &&
      this.nuevoUsuario.TxtPassword
    ){
      return true;
    }
    else{
      return false
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
