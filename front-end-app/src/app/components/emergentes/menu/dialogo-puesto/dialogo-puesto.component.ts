import { PuestosService } from './../../../../services/puestos.service';
import { AgregarActualizarPuesto } from './../../../../models/puestos';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $:any;

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
        this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
      }
    },
    error => {
      this.Mensaje(error.statusText, 4, 1, 1);
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
    if(this.puesto.TxtPuesto !== ''){
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
