import { UsuariosServiceService } from './../../../services/usuarios/usuarios-service.service';
import { DatosUsuarios, ModUsuario } from './../../../models/usuarios';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $:any;

@Component({
  selector: 'app-dialogo-modificar',
  templateUrl: './dialogo-modificar.component.html',
  styleUrls: ['./dialogo-modificar.component.css']
})
export class DialogoModificarComponent implements OnInit {
  UsuarioAModificar: ModUsuario;
  IdUser = {
    IdUsuario: 0
  };
  comprobarContrasenia: string;
  mostrar: boolean;

  constructor(
    private usuariosService: UsuariosServiceService,
    public dialogo: MatDialogRef<DialogoModificarComponent>,
    @Inject(MAT_DIALOG_DATA) public idUsuario: number
  ) { 
    this.IdUser.IdUsuario = idUsuario;
  }

  ngOnInit(): void {
    this.UsuarioAModificar = new ModUsuario;
    this.comprobarContrasenia = '';
    this.ObtenerDatosUsuario();
    this.mostrar = false;
  }

  ObtenerDatosUsuario(){
    this.usuariosService.ServerObtenerDatosUsuario(this.IdUser).subscribe(resultado =>{
      this.UsuarioAModificar = resultado[0];
      this.UsuarioAModificar.TxtPassword = '';
    },
    error =>{
      this.Mensaje(error.statusText, 4, 1, 1);
    })
  }

  ActualizarUsuario(){
    if(this.comprobar()){
      if((this.UsuarioAModificar.TxtPassword === this.comprobarContrasenia) && this.UsuarioAModificar.TxtPassword !== ''){
        this.usuariosService.ServerActualizarUsuario(this.UsuarioAModificar).subscribe(resultado => {
          if(resultado[0].Resultado !== 0){
            this.dialogo.close(true);
          }
          else{
            this.dialogo.close(false);
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
    else
    {
      this.Mensaje("Porfavor completar todos los campos", 3, 1, 1);
    }
  }
  comprobar(){
    if(
      this.UsuarioAModificar.TxtApellidos &&
      this.UsuarioAModificar.TxtNombres &&
      this.UsuarioAModificar.TxtDireccion &&
      this.UsuarioAModificar.TxtEmail &&
      this.UsuarioAModificar.TxtPassword
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
