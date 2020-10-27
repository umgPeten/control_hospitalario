import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActualizarAgregarSubFactores } from 'app/models/factores';
import Swal from 'sweetalert2';
import { SubFactoresService } from 'app/services/sub-factores.service';

@Component({
  selector: 'app-dialogo-sub-factores',
  templateUrl: './dialogo-sub-factores.component.html',
  styleUrls: ['./dialogo-sub-factores.component.css']
})
export class DialogoSubFactoresComponent implements OnInit {
  subFactor: ActualizarAgregarSubFactores;

  constructor(
    public dialogo: MatDialogRef<DialogoSubFactoresComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private subFactoresService: SubFactoresService
  ) { }

  ngOnInit(): void {
    this.subFactor = new ActualizarAgregarSubFactores;
    if(this.mensaje){
      this.cargarSubFactores();
    }
  }

  cargarSubFactores(){
    this.subFactoresService.ServicioObtenerDatosSubFactor(this.mensaje).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.subFactor = resultado[0];
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

  enviarFormulario(){
    if(this.mensaje){
      this.actualizarSubFactor();
    }
    else{
      this.agregarSubFactor();
    }
  }

  actualizarSubFactor(){
    if(this.comprobarCampos()){
      this.subFactoresService.ServerActualizarSubFactor(this.subFactor).subscribe(resultado =>{
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
      }, 
      error =>{
        this.alert('error',error.statusText);
      });
    }
    else{
      this.alert('warning', "Por favor completar todos los campos");
    }
  }

  agregarSubFactor(){
    if(this.comprobarCampos()){
      this.subFactoresService.ServerAgregarSubFactor(this.subFactor).subscribe(resultado =>{
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.subFactor.TxtSubFactor);
        }
        else{
          this.dialogo.close();
          sessionStorage.setItem("DatosUsuario", "");
          sessionStorage.setItem("SessionStarted", "0");
          this.router.navigate(['/login']);
          this.alert('info', "Token del usuario activo invalido");
        }
      },
      error => {
        this.alert('error',error.statusText);
      });
    }
    else{
      this.alert('warning', "Por favor completar todos los campos");
    }
  }

  comprobarCampos(){
    if(this.subFactor.TxtSubFactor !== '' && 
      this.subFactor.TxtDescripcion !== '' 
    ){
      return true;
    }
    else{
      return false;
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
