import { EvaluacionesDetalleService } from 'app/services/evaluaciones-detalle.service';
import { ActualizarAgregarEvaluacionDetalle } from 'app/models/evaluaciones-detalle';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatosEvaluacionEncabezado } from 'app/models/evaluaciones-encabezado';
import { Component, OnInit, Inject } from '@angular/core';
import { EvaluacionesEncabezadoService } from 'app/services/evaluaciones-encabezado.service';
import { TiposDeEvaluacionesService } from 'app/services/tipos-de-evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogo-evaluacion-detalle',
  templateUrl: './dialogo-evaluacion-detalle.component.html',
  styleUrls: ['./dialogo-evaluacion-detalle.component.css']
})
export class DialogoEvaluacionDetalleComponent implements OnInit {
  evaluacionDetalle: ActualizarAgregarEvaluacionDetalle;

  evaluacionEncabezado = 0;
  EvaluacionesEncabezado: DatosEvaluacionEncabezado;



  constructor(
    public dialogo: MatDialogRef<DialogoEvaluacionDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private evaluacionesDetalleService: EvaluacionesDetalleService,
    private evaluacionesEncabezadoService: EvaluacionesEncabezadoService,
    private tiposDeEvaluacionesService: TiposDeEvaluacionesService
  ) { }

  ngOnInit(): void {
    this.evaluacionDetalle = new ActualizarAgregarEvaluacionDetalle;
    this.cargarDatosSelects();
    if(this.mensaje){
      this.cargarEvaluacionDetalle();
    }
  }

  cargarDatosSelects(){
    // this.tiposDeEvaluacionesService.ServicioObtenerTiposDeEvaluacionesService().subscribe(resultado => {
    //   this.tiposEvaluacion = resultado;
    // },
    // error =>{
    //   this.alert('error',error.statusText);
    // });
  }

  cargarEvaluacionDetalle(){
    this.evaluacionesDetalleService.ServicioObtenerDatosEvaluacionDetalle(this.mensaje).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.evaluacionDetalle = resultado[0];
        this.evaluacionEncabezado = this.evaluacionDetalle.IdEvaluacionEncabezado;
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
    this.evaluacionDetalle.IdEvaluacionEncabezado = this.evaluacionEncabezado;

    if(this.mensaje){
      this.actualizarEvaluacionEncabezado();
    }
    else{
      this.agregarEvaluacionencabezado();
    }
  }

  actualizarEvaluacionEncabezado(){
    if(this.comprobarCampos()){
      this.evaluacionesDetalleService.ServerActualizarEvaluacionDetalle(this.evaluacionDetalle).subscribe( resultado => {
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
      this.evaluacionesDetalleService.ServerAgregarEvaluacionDetalle(this.evaluacionDetalle).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.evaluacionDetalle.IdEvaluacionDetalle);
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
      this.evaluacionDetalle.IdEvaluacionEncabezado !== 0 &&
      this.evaluacionDetalle.IdFactor !== 0 &&
      this.evaluacionDetalle.IdSubFactor !== 0
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
