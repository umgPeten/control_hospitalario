import { DatosEvaluacionAplicadaEncabezado } from 'app/models/evaluaciones-aplicadas-encabezado';
import { DatosEvaluacionDetalle } from 'app/models/evaluaciones-detalle';
import { DatosEscalaDeCalificacion } from 'app/models/escalasDeCalificacion';
import { EvaluacionesDetalleService } from 'app/services/evaluaciones-detalle.service';
import { EvaluacionesAplicadasEncabezadoService } from 'app/services/evaluaciones-aplicadas-encabezado.service';
import { EvaluacionesAplicadasDetalleService } from 'app/services/evaluaciones-aplicadas-detalle.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActualizarAgregarEvaluacionAplicadaDetalle, DatosEvaluacionAplicadaDetalle } from 'app/models/evaluaciones-aplicadas-detalle';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { EscalasDeCalificacionService } from 'app/services/escalas-de-calificacion.service';

@Component({
  selector: 'app-dialogo-evaluacion-aplicada-detalle',
  templateUrl: './dialogo-evaluacion-aplicada-detalle.component.html',
  styleUrls: ['./dialogo-evaluacion-aplicada-detalle.component.css']
})
export class DialogoEvaluacionAplicadaDetalleComponent implements OnInit {
  evaluacionAplicadaDetalle: ActualizarAgregarEvaluacionAplicadaDetalle;

  evaluacionAplicadaEnccabezado = 0;
  evaluacionesAplicadasEncabezado: DatosEvaluacionAplicadaEncabezado;

  evaluacionDetalle = 0;
  evaluacionesDetalle: DatosEvaluacionDetalle;

  escalaDeCalificacion = 0;
  escalasDeCalificacion: DatosEscalaDeCalificacion

  constructor(
    public dialogo: MatDialogRef<DialogoEvaluacionAplicadaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private evaluacionesAplicadasDetalleService: EvaluacionesAplicadasDetalleService,
    private evaluacionesDetalleService: EvaluacionesDetalleService,
    private evaluacionesAplicadasEncabezadoService: EvaluacionesAplicadasEncabezadoService,
    private escalasDeCalificacionService: EscalasDeCalificacionService
  ) { }

  ngOnInit(): void {
    this.evaluacionAplicadaDetalle = new ActualizarAgregarEvaluacionAplicadaDetalle;
    this.cargarDatosSelects();
    if(this.mensaje){
      this.cargarEvaluacionDetalle();
    }
  }

  cargarDatosSelects(){
    //detalle
    this.evaluacionesDetalleService.ServicioObtenerEvaluacionesDetalle().subscribe(resultado => {
      this.evaluacionesDetalle = resultado;
    },
    error =>{
      this.alert('error',error.statusText);
    });

    //aplicadas encabezado
    this.evaluacionesAplicadasEncabezadoService.ServicioObtenerEvaluacionesAplicadasEncabezado().subscribe(resultado => {
      this.evaluacionesAplicadasEncabezado = resultado;
    },
    error =>{
      this.alert('error',error.statusText);
    });

    //escalas de calificacion
    this.escalasDeCalificacionService.ServicioObtenerEscalasDeCalificacion().subscribe(resultado => {
      this.escalasDeCalificacion = resultado;
    },
    error =>{
      this.alert('error',error.statusText);
    });
  }

  cargarEvaluacionDetalle(){
    this.evaluacionesAplicadasDetalleService.ServicioObtenerDatosEvaluacionAplicadaDetalle(this.mensaje).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.evaluacionAplicadaDetalle = resultado[0];
        this.evaluacionDetalle = this.evaluacionAplicadaDetalle.IdEvaluacionDetalle;
        this.evaluacionAplicadaEnccabezado = this.evaluacionAplicadaDetalle.IdEvaluacionAplicadaEncabezado;
        this.escalaDeCalificacion = this.evaluacionAplicadaDetalle.IdEscalaDeCalificacion;
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
    this.evaluacionAplicadaDetalle.IdEscalaDeCalificacion = this.escalaDeCalificacion;
    this.evaluacionAplicadaDetalle.IdEvaluacionAplicadaEncabezado = this.evaluacionAplicadaEnccabezado;
    this.evaluacionAplicadaDetalle.IdEvaluacionDetalle = this.evaluacionDetalle;

    if(this.mensaje){
      this.actualizarEvaluacionEncabezado();
    }
    else{
      this.agregarEvaluacionencabezado();
    }
  }

  actualizarEvaluacionEncabezado(){
    if(this.comprobarCampos()){
      this.evaluacionesAplicadasDetalleService.ServerActualizarEvaluacionAplicadaDetalle(this.evaluacionAplicadaDetalle).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(true);
        }
        else{
          this.dialogo.close(false);
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

  agregarEvaluacionencabezado(){
    if(this.comprobarCampos()){
      this.evaluacionesAplicadasDetalleService.ServerAgregarEvaluacionAplicadaDetalle(this.evaluacionAplicadaDetalle).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(true);
        }
        else{
            this.dialogo.close(false);
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
    if(
      this.escalaDeCalificacion !== 0 &&
      this.evaluacionAplicadaEnccabezado !== 0 &&
      this.evaluacionDetalle !== 0
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
