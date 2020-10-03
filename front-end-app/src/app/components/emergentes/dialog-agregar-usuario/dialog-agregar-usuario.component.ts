import { Router } from '@angular/router';
import { AfterLogin } from 'app/models/usuarios';
import { NewUser } from './../../../models/usuarios';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosServiceService } from 'app/services/usuarios-service.service';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-dialog-agregar-usuario',
  templateUrl: './dialog-agregar-usuario.component.html',
  styleUrls: ['./dialog-agregar-usuario.component.css']
})
export class DialogAgregarUsuarioComponent implements OnInit {
  nuevoUsuario: NewUser;
  comprobarContrasenia: string;
  // DatosUsuarioActivo: AfterLogin;
  hide = true;
  // mostrar: boolean;

  constructor(
    private usuariosService: UsuariosServiceService,
    public dialogo: MatDialogRef<DialogAgregarUsuarioComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.DatosUsuarioActivo = JSON.parse(sessionStorage.getItem("DatosUsuario"));
    this.nuevoUsuario = new NewUser;
    this.comprobarContrasenia = '';
    // this.mostrar = false;
  }

  AgregarNuevoUsuario(){
    if(this.comprobar()){
      // this.nuevoUsuario.TxtToken = this.DatosUsuarioActivo.TxtToken;
      if((this.nuevoUsuario.TxtPassword === this.comprobarContrasenia) && this.nuevoUsuario.TxtPassword !== ''){
        this.usuariosService.ServerAgregarUsuario(this.nuevoUsuario).subscribe(resultado =>{
          if(resultado[0].EstadoToken !== '0'){
            this.dialogo.close(this.nuevoUsuario.TxtNombres + " " + this.nuevoUsuario.TxtApellidos);
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
      else{
        // this.Mensaje("Verificar contraseña", 3, 1, 1);
        this.alert('warning', "Verificar contraseña");
      }
    }
    else{
      // this.Mensaje("Porfavor completar todos los campos", 3, 1, 1);
      this.alert('warning', "Por favor completar todos los campos");
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
