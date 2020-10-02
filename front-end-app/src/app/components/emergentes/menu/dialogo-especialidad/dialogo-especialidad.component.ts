import { AgregarActualizarEspecialidad } from './../../../../models/especialidades';
import { EspecialidadesService } from './../../../../services/especialidades.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $:any;

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
        this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
      }
    },
    error => {
      this.Mensaje(error.statusText, 4, 1, 1);
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
          this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
        }
      },
      error => {
        this.Mensaje(error.statusText, 4, 1, 1);
      });
    }
    else{
      this.Mensaje("Por favor completar todos los campos", 3, 1, 1);
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
            this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
        }
      },
      error => {
        this.Mensaje(error.statusText, 4, 1, 1);
      });
    }
    else{
      this.Mensaje("Por favor completar todos los campos", 3, 1, 1);
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
}
