import { PuestosService } from './../../../../services/puestos.service';
import { AgregarActualizarPuesto } from './../../../../models/puestos';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-dialogo-puesto',
  templateUrl: './dialogo-puesto.component.html',
  styleUrls: ['./dialogo-puesto.component.css']
})
export class DialogoPuestoComponent implements OnInit {
  puesto: AgregarActualizarPuesto; 

  constructor(
    public dialogo: MatDialogRef<DialogoPuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private puestosService: PuestosService
  ) { }

  ngOnInit(): void {
    this.puesto = new AgregarActualizarPuesto;
    if(this.mensaje){
      this.cargarPuesto();
    }
  }

  cargarPuesto(){
    this.puestosService.ServicioObtenerDatosPuesto(this.mensaje).subscribe(resultado => {
      if(resultado[0].EstadoToken !== '0'){
        this.puesto = resultado[0];
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
      this.actualizarPuesto();
    }
    else{
      this.agregarPuesto();
    }
  }

  actualizarPuesto(){
    if(this.comprobarCampos()){
      this.puestosService.ServerActualizarPuesto(this.puesto).subscribe( resultado => {
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

  agregarPuesto(){
    if(this.comprobarCampos()){
      this.puestosService.ServerAgregarPuesto(this.puesto).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.puesto.TxtPuesto);
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
    if(this.puesto.TxtPuesto !== ''){
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
