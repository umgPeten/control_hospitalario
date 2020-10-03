import { Router } from '@angular/router';
import { UsuariosServiceService } from '../../../services/usuarios-service.service';
import { DatosUsuarios, ModUsuario } from './../../../models/usuarios';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-dialogo-modificar',
  templateUrl: './dialogo-modificar.component.html',
  styleUrls: ['./dialogo-modificar.component.css']
})
export class DialogoModificarComponent implements OnInit {
  UsuarioAModificar: ModUsuario;
  IdUser = {
    IdUsuario: 0,
    TxtToken: ''
  };
  comprobarContrasenia: string;
  // mostrar: boolean;
  hide = true;

  constructor(
    private usuariosService: UsuariosServiceService,
    public dialogo: MatDialogRef<DialogoModificarComponent>,
    @Inject(MAT_DIALOG_DATA) public idUsuario: number,
    private router: Router
  ) { 
    this.IdUser.IdUsuario = idUsuario;
  }

  ngOnInit(): void {
    this.UsuarioAModificar = new ModUsuario;
    this.comprobarContrasenia = '';
    this.ObtenerDatosUsuario();
    // this.mostrar = false;
  }

  ObtenerDatosUsuario(){
    this.usuariosService.ServerObtenerDatosUsuario(this.IdUser).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.UsuarioAModificar = resultado[0];
        this.UsuarioAModificar.TxtPassword = '';
      }
      else{
        this.dialogo.close();
        sessionStorage.setItem("DatosUsuario", "");
        sessionStorage.setItem("SessionStarted", "0");
        this.router.navigate(['/login']);
        this.alert('info', "Token del usuario activo invalido");
      }
    },
    error =>{
      this.alert('error',error.statusText);
    })
  }

  ActualizarUsuario(){
    if(this.comprobar()){
      if((this.UsuarioAModificar.TxtPassword === this.comprobarContrasenia) && this.UsuarioAModificar.TxtPassword !== ''){
        this.usuariosService.ServerActualizarUsuario(this.UsuarioAModificar).subscribe(resultado => {
          if(resultado[0].Resultado !== 0){
            if(resultado[0].EstadoToken !== '0'){
              this.dialogo.close(true);
            }
            else{
              this.dialogo.close();
              sessionStorage.setItem("DatosUsuario", "");
              sessionStorage.setItem("SessionStarted", "0");
              this.router.navigate(['/login']);
              this.alert('info', "Token del usuario activo invalido");
            }
          }
          else{
            this.dialogo.close(false);
          }
        },
        error =>{
          this.alert('error',error.statusText);
        })
      }
      else{
        this.alert('warning', "Verificar contraseña");
      }
    }
    else
    {
      this.alert('warning', "Por favor completar todos los campos");
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
