import { AgregarActualizarRenglon } from './../../../../models/renglones';
import { RenglonesService } from './../../../../services/renglones.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

// declare var $:any;

@Component({
  selector: 'app-dialogo-renglon',
  templateUrl: './dialogo-renglon.component.html',
  styleUrls: ['./dialogo-renglon.component.css']
})
export class DialogoRenglonComponent implements OnInit {
  renglon: AgregarActualizarRenglon;

  constructor(
    public dialogo: MatDialogRef<DialogoRenglonComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private renglonesService: RenglonesService
  ) { }

  ngOnInit(): void {
    this.renglon = new AgregarActualizarRenglon;
    if(this.mensaje){
      this.cargarrenglones();
    }
  }

  cargarrenglones(){
    this.renglonesService.ServicioObtenerDatosRenglon(this.mensaje).subscribe(resultado => {
      if(resultado[0].EstadoToken !== '0'){
        this.renglon = resultado[0];
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
      this.actualizarRenglon();
    }
    else{
      this.agregarRenglon();
    }
  }

  actualizarRenglon(){
    if(this.comprobarCampos()){
      this.renglonesService.ServerActualizarRenglon(this.renglon).subscribe( resultado => {
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

  agregarRenglon(){
    if(this.comprobarCampos()){
      this.renglonesService.ServerAgregarRenglon(this.renglon).subscribe( resultado => {
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.renglon.TxtRenglon);
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
    if(this.renglon.TxtRenglon !== ''){
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
