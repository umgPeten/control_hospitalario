import { AgregarActualizarServicios } from './../../../../models/servicios';
import { ServiciosService } from './../../../../services/servicios.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $:any;

@Component({
  selector: 'app-dialogo-servicio',
  templateUrl: './dialogo-servicio.component.html',
  styleUrls: ['./dialogo-servicio.component.css']
})
export class DialogoServicioComponent implements OnInit {
  servicio: AgregarActualizarServicios;

  constructor(
    public dialogo: MatDialogRef<DialogoServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    this.servicio = new AgregarActualizarServicios;
    if(this.mensaje){
        this.cargarServicios();
    }
  }

  cargarServicios(){
    this.serviciosService.ServicioObtenerDatosServicio(this.mensaje).subscribe(resultado => {
      if(resultado[0].EstadoToken !== '0'){
        this.servicio = resultado[0];
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
      this.actualizarServicio();
    }
    else{
      this.agregarServicio();
      
    }
  }

  actualizarServicio(){
    if(this.comprobarCampos()){
      this.serviciosService.ServerActualizarServicio(this.servicio).subscribe( resultado => {
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

  agregarServicio(){
    if(this.comprobarCampos()){
      this.serviciosService.ServerAgregarServicio(this.servicio).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.servicio.TxtServicio);
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
    if( this.servicio.TxtServicio !== ""){
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
