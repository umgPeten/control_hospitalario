import { EvaluacionesEncabezadoService } from 'app/services/evaluaciones-encabezado.service';
import { DatosEvaluacionEncabezado } from 'app/models/evaluaciones-encabezado';
import { DatosEmpleado } from 'app/models/empleados';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ActualizarAgregarEvaluacionAplicadaEncabezado } from 'app/models/evaluaciones-aplicadas-encabezado';
import { EvaluacionesAplicadasEncabezadoService } from 'app/services/evaluaciones-aplicadas-encabezado.service';
import Swal from 'sweetalert2';
import { EmpleadosService } from 'app/services/empleados.service';

@Component({
  selector: 'app-dialogo-evaluacion-aplicada-encabezado',
  templateUrl: './dialogo-evaluacion-aplicada-encabezado.component.html',
  styleUrls: ['./dialogo-evaluacion-aplicada-encabezado.component.css']
})
export class DialogoEvaluacionAplicadaEncabezadoComponent implements OnInit {
  evaluacionAplicadaEncabezado: ActualizarAgregarEvaluacionAplicadaEncabezado;

  // tipoEvaluacion = 0;
  // tiposEvaluacion: DatosTipoDeEvaluacion;

  empleado = 0;
  empleados: DatosEmpleado;

  evaluacionEncabezado = 0;
  evaluacionesEncabezado: DatosEvaluacionEncabezado;

  institucion = 0;
  instituciones: any;

  constructor(
    public dialogo: MatDialogRef<DialogoEvaluacionAplicadaEncabezadoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private evaluacionesAplicadasEncabezadoService: EvaluacionesAplicadasEncabezadoService,
    private empleadosService: EmpleadosService,
    private evaluacionesEncabezadoService: EvaluacionesEncabezadoService,
    // private tiposDeEvaluacionesService: TiposDeEvaluacionesService
  ) { }

  ngOnInit(): void {
    this.evaluacionAplicadaEncabezado = new ActualizarAgregarEvaluacionAplicadaEncabezado;
    this.cargarDatosSelects();
    if(this.mensaje){
      this.cargarEvaluacionAplicadaEncabezado();
    }
  }

  cargarDatosSelects(){
    //empleados
    this.empleadosService.ServicioObtenerEmpleados().subscribe(resultado => {
      this.empleados = resultado;
    },
    error =>{
      this.alert('error',error.statusText);
    });

    //Evaluaciones encabezado
    this.evaluacionesEncabezadoService.ServicioObtenerEvaluacionesEncabezado().subscribe(resultado => {
      this.evaluacionesEncabezado = resultado;
    },
    error =>{
      this.alert('error',error.statusText);
    });     
  }

  cargarEvaluacionAplicadaEncabezado(){
    this.evaluacionesAplicadasEncabezadoService.ServicioObtenerDatosEvaluacionAplicadaEncabezado(this.mensaje).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.evaluacionAplicadaEncabezado = resultado[0];
        this.empleado = this.evaluacionAplicadaEncabezado.IdEmpleado;
        this.evaluacionEncabezado = this.evaluacionAplicadaEncabezado.IdEvaluacionEncabezado;
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
    this.evaluacionAplicadaEncabezado.IdEmpleado = this.empleado;
    this.evaluacionAplicadaEncabezado.IdEvaluacionEncabezado = this.evaluacionEncabezado;
    this.evaluacionAplicadaEncabezado.IdInstitucion = 1;

    if(this.mensaje){
      this.actualizarEvaluacionAplicadaEncabezado();
    }
    else{
      this.agregarEvaluacionAplicadaEncabezado();
    }
  }

  actualizarEvaluacionAplicadaEncabezado(){
    if(this.comprobarCampos()){
      this.evaluacionesAplicadasEncabezadoService.ServerActualizarEvaluacionAplicadaEncabezado(this.evaluacionAplicadaEncabezado).subscribe( resultado => {
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

  agregarEvaluacionAplicadaEncabezado(){
    if(this.comprobarCampos()){
      this.evaluacionesAplicadasEncabezadoService.ServerAgregarEvaluacionAplicadaEncabezado(this.evaluacionAplicadaEncabezado).subscribe( resultado => {
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
      this.empleado !== 0 &&
      this.evaluacionAplicadaEncabezado.FechaDeAplicacion !== '' &&
      this.evaluacionAplicadaEncabezado.FechaFinal !== '' &&
      this.evaluacionAplicadaEncabezado.FechaInicial !== '' &&
      this.evaluacionAplicadaEncabezado.IdEvaluacionEncabezado !== 0 &&
      this.evaluacionAplicadaEncabezado.IdInstitucion !== 0 &&
      this.evaluacionAplicadaEncabezado.TxtObservacionesDeJefe !== '' &&
      this.evaluacionAplicadaEncabezado.TxtObservacionesDelEmpleado !== '' &&
      this.evaluacionAplicadaEncabezado.DblPunteoTotal !== 0
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
