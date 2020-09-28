import { ActualizarAgregarEmpleado } from './../../../../models/empleados';
import { EmpleadosService } from './../../../../services/empleados.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

declare var $:any;

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
  // puestos: DatosPuestos;
  // especialidades: DatosEspecialidades;
  // servicios: DatosServicios;
  // renglones: DatosRenglones;
  // instituciones: DatosInstituciones;

  constructor(
    public dialogo: MatDialogRef<DialogoEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private empleadosService: EmpleadosService
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
      this.empleado = resultado[0];
      this.puesto = this.empleado.IdPuesto;
      this.especialidad = this.empleado.IdEspecialidad;
      this.servicio = this.empleado.IdServicio;
      this.renglon = this.empleado.IdRenglon;
      this.institucion = this.empleado.IdInstitucion;
    },
    error => {
      this.Mensaje(error.statusText, 4, 1, 1);
    });
  }
  
  cargarDatosSelects(){
    //puestos
    // this.puestosService.ServicioObtenerPuestos().subscribe(resultado => {
    //   this.puestos = resultado;
    // },
    // error => {
    //   this.Mensaje(error.statusText, 4, 1, 1);
    // });

    //especialidad
    // this.especialidadesService.ServicioObtenerEspecialidades().subscribe(resultado => {
    //   this.especialidades = resultado;
    // },
    // error => {
    //   this.Mensaje(error.statusText, 4, 1, 1);
    // });

    //servicio
    // this.serviciosService.ServicioObtenerServicios().subscribe(resultado => {
    //   this.servicios = resultado;
    // },
    // error => {
    //   this.Mensaje(error.statusText, 4, 1, 1);
    // });

    //renglon
    // this.renglonesService.ServicioObtenerRenglones().subscribe(resultado => {
    //   this.renglones = resultado;
    // },
    // error => {
    //   this.Mensaje(error.statusText, 4, 1, 1);
    // });

    //institucion
    // this.institucionesService.ServicioObtenerinstituciones().subscribe(resultado => {
    //   this.instituciones = resultado;
    // },
    // error => {
    //   this.Mensaje(error.statusText, 4, 1, 1);
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
        if(resultado[0].EstadoToken !== 0){
          this.dialogo.close(true);
        }
        else{
          sessionStorage.setItem("DatosUsuario", "");
          sessionStorage.setItem("SessionStarted", "0");
          this.router.navigate(['/login']);
          this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
        }
      },
      error => {
        this.Mensaje(error.statusText, 4, 1, 1);
      });
    }
    else{
      this.Mensaje("Porfavor completar todos los campos", 3, 1, 1);
    }
  }

  agregarEmpleado(){
    if(this.comprobarCampos()){
      this.empleadosService.ServerAgregarEmpleado(this.empleado).subscribe( resultado => {
        if(resultado[0].EstadoToken !== 0){
          this.dialogo.close(this.empleado.TxtNombres + " " + this.empleado.TxtApellidos);
        }
        else{
            sessionStorage.setItem("DatosUsuario", "");
            sessionStorage.setItem("SessionStarted", "0");
            this.router.navigate(['/login']);
            this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
        }
      },
      error => {
        this.Mensaje(error.statusText, 4, 1, 1);
      });
    }
    else{
      this.Mensaje("Porfavor completar todos los campos", 3, 1, 1);
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

  Mensaje(mensaje: any, color: number, posY:number, posX: number){
    const type = ['','info','success','warning','danger'];
    const from = ['', 'top', 'bottom'];
    const align = ['', 'left', 'center', 'right'];

    $.notify({
        icon: "",
        message: mensaje
    },{
        type: type[color],
        timer: 1000,
        placement: {
            from: from[posY],
            align: align[posX]
        }
    });
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  confirmado(): void {
    this.dialogo.close(true);
  }
}
