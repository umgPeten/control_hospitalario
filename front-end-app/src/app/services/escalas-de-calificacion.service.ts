import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { ActualizarAgregarEscalaDeCalificacion, DatosEscalaDeCalificacion } from 'app/models/escalasDeCalificacion';

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

  ServicioObtenerEscalasDeCalificacion(): Observable<any>{
    this.escalaDeCalificacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerEscalasDeCalificacion`, this.escalaDeCalificacion);
  }

  ServicioObtenerDatosEscalaDeCalificacion(id: number): Observable<any>{
    this.escalaDeCalificacion.IdEscalaDeCalificacion = id;
    this.escalaDeCalificacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosEscalasDeCalificacion`, this.escalaDeCalificacion);
  }

  ServerEliminarEscalaDeCalificacion(escalaDeCalificacion: DatosEscalaDeCalificacion): Observable<any>{
    this.escalaDeCalificacion.IdEscalaDeCalificacion = escalaDeCalificacion.IdEscalaDeCalificacion;
    this.escalaDeCalificacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarEscalasDeCalificacion`, this.escalaDeCalificacion);
  }

  ServerAgregarEscalaDeCalificacion(escalaDeCalificacion: ActualizarAgregarEscalaDeCalificacion): Observable<any>{
    escalaDeCalificacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarEscalasDeCalificacion`, escalaDeCalificacion);
  }

  ServerActualizarEscalaDeCalificacion(escalaDeCalificacion: ActualizarAgregarEscalaDeCalificacion): Observable<any>{
    escalaDeCalificacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarEscalasDeCalificacion`, escalaDeCalificacion);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
