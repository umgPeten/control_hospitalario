import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EscalasDeCalificacionService {
  escalaDeCalificacion = {
    IdEscalaDeCalificacion: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerFactores(): Observable<any>{
    this.escalaDeCalificacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerFactores`, this.escalaDeCalificacion);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
