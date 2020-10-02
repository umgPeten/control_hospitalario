import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { DatosServicios , AgregarActualizarServicios  } from './../models/servicios';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
    servicio = {
    Idservicio: 0,
    TxtToken: ''
  };
  constructor(
    private httpClient: HttpClient,
  ) { }
  ServicioObtenerServicios(): Observable<any>{
    this.servicio.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerServicios`, this.servicio);
  }

  ServicioObtenerDatosServicio(id: number): Observable<any>{
    this.servicio.Idservicio = id;
    this.servicio.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosServicio`, this.servicio);
  }

  ServerEliminarServicio(servicio: DatosServicios): Observable<any>{
    this.servicio.Idservicio = servicio.IdServicio;
    this.servicio.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarServicio`, this.servicio);
  }

  ServerAgregarServicio(servicio: AgregarActualizarServicios): Observable<any>{
    servicio.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarServicio`, servicio);
  }

  ServerActualizarServicio(servicio: AgregarActualizarServicios): Observable<any>{
    servicio.TxtToken = this.getToken().TxtToken;
    
    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarServicio`, servicio);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
  
  
}
