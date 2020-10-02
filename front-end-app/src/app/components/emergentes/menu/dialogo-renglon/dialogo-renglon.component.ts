import { AgregarActualizarRenglon } from './../../../../models/renglones';
import { RenglonesService } from './../../../../services/renglones.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $:any;

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
        this.Mensaje("Token del usuario activo invalido", 4, 1, 1);
      }
    },
    error => {
      this.Mensaje(error.statusText, 4, 1, 1);
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
    if(this.renglon.TxtRenglon !== ''){
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
