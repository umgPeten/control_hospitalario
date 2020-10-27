import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { ActualizarAgregarEscalaDeCalificacion } from 'app/models/escalasDeCalificacion';
import { EscalasDeCalificacionService } from 'app/services/escalas-de-calificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogo-escala-de-calificacion',
  templateUrl: './dialogo-escala-de-calificacion.component.html',
  styleUrls: ['./dialogo-escala-de-calificacion.component.css']
})
export class DialogoEscalaDeCalificacionComponent implements OnInit {
  escalaDeCalificacion: ActualizarAgregarEscalaDeCalificacion;

  constructor(
    public dialogo: MatDialogRef<DialogoEscalaDeCalificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private escalasDeCalificacionService: EscalasDeCalificacionService
  ) { }

  ngOnInit(): void {
    this.escalaDeCalificacion = new ActualizarAgregarEscalaDeCalificacion;
    if(this.mensaje){
      this.cargarEscalaDeCalificacion();
    }
  }

  cargarEscalaDeCalificacion(){
    this.escalasDeCalificacionService.ServicioObtenerEscalasDeCalificacion().subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.escalaDeCalificacion = resultado[0];
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

  enviarFormulario(){
    if(this.mensaje){
      this.actualizarEscalaDeCalificacion();
    }
    else{
      this.agregarEscalaDeCalificacion();
    }
  }

  actualizarEscalaDeCalificacion(){
    if(this.comprobarCampos()){
      this.escalasDeCalificacionService.ServerActualizarEscalaDeCalificacion(this.escalaDeCalificacion).subscribe( resultado => {
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

  agregarEscalaDeCalificacion(){
    if(this.comprobarCampos()){
      this.escalasDeCalificacionService.ServerAgregarEscalaDeCalificacion(this.escalaDeCalificacion).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.escalaDeCalificacion.TxtEscalaDeCalificacion);
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
    if(this.escalaDeCalificacion.TxtEscalaDeCalificacion !== '' &&
       this.escalaDeCalificacion.DblPunteo !== 0 &&
       this.escalaDeCalificacion.TxtDescripcion !== ''
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
