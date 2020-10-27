import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactoresService } from 'app/services/factores.service';
import { ActualizarAgregarFactores } from 'app/models/factores';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogo-factores',
  templateUrl: './dialogo-factores.component.html',
  styleUrls: ['./dialogo-factores.component.css']
})
export class DialogoFactoresComponent implements OnInit {
  factor: ActualizarAgregarFactores

  constructor(
    public dialogo: MatDialogRef<DialogoFactoresComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any,
    private router: Router,
    private factoresService: FactoresService
  ) { }

  ngOnInit(): void {
    this.factor = new ActualizarAgregarFactores;
    if(this.mensaje){
      this.cargarFactor();
    }
  }

  cargarFactor(){
    this.factoresService.ServicioObtenerDatosFactor(this.mensaje).subscribe(resultado =>{
      if(resultado[0].EstadoToken !== '0'){
        this.factor = resultado[0];
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
    })
  }

  enviarFormulario(){
    if(this.mensaje){
      this.actualizarFactor();
    }
    else{
      this.agregarFactor();
    }
  }

  actualizarFactor(){
    if(this.comprobarCampos()){
      this.factoresService.ServerActualizarFactor(this.factor).subscribe(resultado =>{
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
      error =>{
        this.alert('error',error.statusText);
      });
    }
    else{
      this.alert('warning', "Por favor completar todos los campos");
    }
  }

  agregarFactor(){
    if(this.comprobarCampos()){
      this.factoresService.ServerAgregarFactor(this.factor).subscribe(resultado =>{
        if(resultado[0].EstadoToken !== '0'){
          this.dialogo.close(this.factor.TxtFactor);
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
    if(this.factor.TxtFactor !== '' && 
      this.factor.TxtDescripcion !== '' 
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
