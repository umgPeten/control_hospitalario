import { DatosTipoDeEvaluacion } from './../../../../models/tipos-de-evaluaciones';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ActualizarAgregarEvaluacionEncabezado } from 'app/models/evaluaciones-encabezado';
import { EvaluacionesEncabezadoService } from 'app/services/evaluaciones-encabezado.service';
import Swal from 'sweetalert2';
import { TiposDeEvaluacionesService } from 'app/services/tipos-de-evaluaciones.service';

@Component({
  selector: 'app-dialogo-evaluacion-encabezado',
  templateUrl: './dialogo-evaluacion-encabezado.component.html',
  styleUrls: ['./dialogo-evaluacion-encabezado.component.css']
})
export class DialogoEvaluacionEncabezadoComponent implements OnInit {
  evaluacionEncabezado: ActualizarAgregarEvaluacionEncabezado;

  tipoEvaluacion = 0;
  tiposEvaluacion: DatosTipoDeEvaluacion;

  constructor(
    public dialogo: MatDialogRef<DialogoEvaluacionEncabezadoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private evaluacionesEncabezadoService: EvaluacionesEncabezadoService,
    private tiposDeEvaluacionesService: TiposDeEvaluacionesService
  ) { }

  ngOnInit(): void {
    this.evaluacionEncabezado = new ActualizarAgregarEvaluacionEncabezado;
    this.cargarDatosSelects();
    if(this.mensaje){
      this.cargarEvaluacionEncabezado();
    }
  }

  cargarDatosSelects(){
    this.tiposDeEvaluacionesService.ServicioObtenerTiposDeEvaluacionesService().subscribe(resultado => {
      this.tiposEvaluacion = resultado;
    },
    error =>{
      this.alert('error',error.statusText);
    });
  }

  cargarEvaluacionEncabezado(){
    this.evaluacionesEncabezadoService.ServicioObtenerDatosEvaluacionEncabezado(this.mensaje).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.evaluacionEncabezado = resultado[0];
        this.tipoEvaluacion = this.evaluacionEncabezado.IdTipoDeEvaluacion;
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
    this.evaluacionEncabezado.IdTipoDeEvaluacion = this.tipoEvaluacion;

    if(this.mensaje){
      this.actualizarEvaluacionEncabezado();
    }
    else{
      this.agregarEvaluacionencabezado();
    }
  }

  actualizarEvaluacionEncabezado(){
    if(this.comprobarCampos()){
      this.evaluacionesEncabezadoService.ServerActualizarEvaluacionEncabezado(this.evaluacionEncabezado).subscribe( resultado => {
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
      this.evaluacionesEncabezadoService.ServerAgregarEvaluacionEncabezado(this.evaluacionEncabezado).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.evaluacionEncabezado.IdTipoDeEvaluacion);
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
      this.evaluacionEncabezado.Anio !== 0 &&
      this.tipoEvaluacion !== 0
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
