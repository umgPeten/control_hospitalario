import { AgregarActualizarEspecialidad } from './../../../../models/especialidades';
import { EspecialidadesService } from './../../../../services/especialidades.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-dialogo-especialidad',
  templateUrl: './dialogo-especialidad.component.html',
  styleUrls: ['./dialogo-especialidad.component.css']
})
export class DialogoEspecialidadComponent implements OnInit {
  especialidad: AgregarActualizarEspecialidad; 

  constructor(
    public dialogo: MatDialogRef<DialogoEspecialidadComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private especialidadesService: EspecialidadesService
  ) { }

  ngOnInit(): void {
    this.especialidad = new AgregarActualizarEspecialidad;
    if(this.mensaje){
      this.cargarsepecialidades();
    }
  }

  cargarsepecialidades(){
    this.especialidadesService.ServicioObtenerDatosEspecialidad(this.mensaje).subscribe(resultado => {
      if(resultado[0].EstadoToken !== '0'){
        this.especialidad = resultado[0];
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
      this.actualizarEspecialidad();
    }
    else{
      this.agregarEspecialidad();
    }
  }

  actualizarEspecialidad(){
    if(this.comprobarCampos()){
      this.especialidadesService.ServerActualizarEspecialidad(this.especialidad).subscribe( resultado => {
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

  agregarEspecialidad(){
    if(this.comprobarCampos()){
      this.especialidadesService.ServerAgregarEspecialidad(this.especialidad).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.especialidad.TxtEspecialidad);
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
    if(this.especialidad.TxtEspecialidad !== ''){
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
