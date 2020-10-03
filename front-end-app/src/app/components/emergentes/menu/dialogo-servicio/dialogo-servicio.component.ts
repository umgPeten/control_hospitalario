import { AgregarActualizarServicios } from './../../../../models/servicios';
import { ServiciosService } from './../../../../services/servicios.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-dialogo-servicio',
  templateUrl: './dialogo-servicio.component.html',
  styleUrls: ['./dialogo-servicio.component.css']
})
export class DialogoServicioComponent implements OnInit {
  servicio: AgregarActualizarServicios;

  constructor(
    public dialogo: MatDialogRef<DialogoServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    this.servicio = new AgregarActualizarServicios;
    if(this.mensaje){
        this.cargarServicios();
    }
  }

  cargarServicios(){
    this.serviciosService.ServicioObtenerDatosServicio(this.mensaje).subscribe(resultado => {
      if(resultado[0].EstadoToken !== '0'){
        this.servicio = resultado[0];
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

  enviarFormulario(){
    if(this.mensaje){ 
      this.actualizarServicio();
    }
    else{
      this.agregarServicio();
      
    }
  }

  actualizarServicio(){
    if(this.comprobarCampos()){
      this.serviciosService.ServerActualizarServicio(this.servicio).subscribe( resultado => {
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
      error => {
        this.alert('error',error.statusText);
      });
    }
    else{
      this.alert('warning', "Por favor completar todos los campos");
    }
  }

  agregarServicio(){
    if(this.comprobarCampos()){
      this.serviciosService.ServerAgregarServicio(this.servicio).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.servicio.TxtServicio);
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
    if( this.servicio.TxtServicio !== ""){
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
