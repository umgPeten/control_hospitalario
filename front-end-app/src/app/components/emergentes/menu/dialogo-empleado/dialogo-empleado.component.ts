import { DatosPuestos } from './../../../../models/puestos';
import { PuestosService } from './../../../../services/puestos.service';
import { ServiciosService } from './../../../../services/servicios.service';
import { DatosServicios } from './../../../../models/servicios';
import { RenglonesService } from './../../../../services/renglones.service';
import { EspecialidadesService } from './../../../../services/especialidades.service';
import { ActualizarAgregarEmpleado } from './../../../../models/empleados';
import { EmpleadosService } from './../../../../services/empleados.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatosEspecialidades } from 'app/models/especialidades';
import { DatosRenglones } from 'app/models/renglones';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-dialogo-empleado',
  templateUrl: './dialogo-empleado.component.html',
  styleUrls: ['./dialogo-empleado.component.css']
})
export class DialogoEmpleadoComponent implements OnInit {
  empleado: ActualizarAgregarEmpleado;
  puesto = 0;
  especialidad = 0;
  servicio = 0;
  renglon = 0;
  institucion = 0;

  //Selects
  puestos: DatosPuestos;
  especialidades: DatosEspecialidades;
  servicios: DatosServicios;
  renglones: DatosRenglones;
  // instituciones: DatosInstituciones;

  constructor(
    public dialogo: MatDialogRef<DialogoEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private empleadosService: EmpleadosService,
    private especialidadesService: EspecialidadesService,
    private renglonesService: RenglonesService,
    private serviciosService: ServiciosService,
    private puestosService: PuestosService
  ) { }

  ngOnInit(): void {
    this.empleado = new ActualizarAgregarEmpleado;
    this.cargarDatosSelects();
    if(this.mensaje){
      this.cargarInformacionEmpleado();
    }
  }

  cargarInformacionEmpleado(){
    this.empleadosService.ServicioObtenerDatosEmpleado(this.mensaje).subscribe(resultado => {
      if(resultado[0].EstadoToken !== '0'){
        this.empleado = resultado[0];
        this.puesto = this.empleado.IdPuesto;
        this.especialidad = this.empleado.IdEspecialidad;
        this.servicio = this.empleado.IdServicio;
        this.renglon = this.empleado.IdRenglon;
        this.institucion = this.empleado.IdInstitucion;
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
  
  cargarDatosSelects(){
    //puestos
    this.puestosService.ServicioObtenerPuestos().subscribe(resultado => {
      this.puestos = resultado;
    },
    error => {
      this.alert('error',error.statusText);
    });

    // especialidad
    this.especialidadesService.ServicioObtenerEspecialidades().subscribe(resultado => {
      this.especialidades = resultado;
    },
    error => {
      this.alert('error',error.statusText);
    });

    //servicio
    this.serviciosService.ServicioObtenerServicios().subscribe(resultado => {
      this.servicios = resultado;
    },
    error => {
      this.alert('error',error.statusText);
    });

    // renglon
    this.renglonesService.ServicioObtenerRenglones().subscribe(resultado => {
      this.renglones = resultado;
    },
    error => {
      this.alert('error',error.statusText);
    });

    //institucion
    // this.institucionesService.ServicioObtenerinstituciones().subscribe(resultado => {
    //   this.instituciones = resultado;
    // },
    // error => {
    //   this.alert('error',error.statusText);
    // });
  }

  enviarFormulario(){
    this.actualizarSelects();

    if(this.mensaje){
      this.actualizarEmpleado();
    }
    else{
      this.agregarEmpleado();
    }
  }

  actualizarEmpleado(){
    if(this.comprobarCampos()){
      this.empleadosService.ServerActualizarEmpleado(this.empleado).subscribe( resultado => {
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
      // this.Mensaje("Por favor completar todos los campos", 3, 1, 1);
      this.alert('warning', "Por favor completar todos los campos");
    }
  }

  agregarEmpleado(){
    if(this.comprobarCampos()){
      this.empleadosService.ServerAgregarEmpleado(this.empleado).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.empleado.TxtNombres + " " + this.empleado.TxtApellidos);
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
      // this.Mensaje("Por favor completar todos los campos", 3, 1, 1);
      this.alert('warning', "Por favor completar todos los campos");
    }
  }

  comprobarCampos(){
    if(
        this.puesto !== 0 &&
        this.especialidad !== 0 &&
        this.servicio !== 0 &&
        this.renglon !== 0 &&
        this.institucion !== 0 &&
        this.empleado.TxtNombres !== '' &&
        this.empleado.TxtApellidos !== '' &&
        this.empleado.TxtNit !== '' &&
        this.empleado.TxtDpi !== ''
      ){
      return true;
    }
    else{
      return false;
    }
  }

  actualizarSelects(){
    this.empleado.IdPuesto = this.puesto;
    this.empleado.IdEspecialidad = this.especialidad;
    this.empleado.IdServicio = this.servicio;
    this.empleado.IdRenglon = this.renglon;
    this.empleado.IdInstitucion = this.institucion;
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
