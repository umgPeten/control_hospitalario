import { ActualizarAgregarTipoDeEvaluacion } from 'app/models/tipos-de-evaluaciones';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TiposDeEvaluacionesService } from 'app/services/tipos-de-evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogo-tipos-de-evaluacion',
  templateUrl: './dialogo-tipos-de-evaluacion.component.html',
  styleUrls: ['./dialogo-tipos-de-evaluacion.component.css']
})
export class DialogoTiposDeEvaluacionComponent implements OnInit {
  tipoDeEvaluacion: ActualizarAgregarTipoDeEvaluacion;

  constructor(
    public dialogo: MatDialogRef<DialogoTiposDeEvaluacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private tiposDeEvaluacionesService: TiposDeEvaluacionesService
  ) { }

  ngOnInit(): void {
    this.tipoDeEvaluacion = new ActualizarAgregarTipoDeEvaluacion;
    if(this.mensaje){
      this.cargarTipoDeEvaluacion();
    }
  }

  cargarTipoDeEvaluacion(){
    this.tiposDeEvaluacionesService.ServicioObtenerDatosTipoDeEvaluacion(this.mensaje).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.tipoDeEvaluacion = resultado[0];
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
      this.actualizarTipoDeEvaluacion();
    }
    else{
      this.agregarTipoDeEvaluacion();
    }
  }

  actualizarTipoDeEvaluacion(){
    if(this.comprobarCampos()){
      this.tiposDeEvaluacionesService.ServerActualizarTipoDeEvaluacion(this.tipoDeEvaluacion).subscribe( resultado => {
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

  agregarTipoDeEvaluacion(){
    if(this.comprobarCampos()){
      this.tiposDeEvaluacionesService.ServerAgregarTipoDeEvaluacion(this.tipoDeEvaluacion).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.tipoDeEvaluacion.TxtTipoDeEvaluacion);
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
    if(this.tipoDeEvaluacion.TxtTipoDeEvaluacion !== ''){
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
