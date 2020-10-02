import { AgregarActualizarEspecialidad, DatosEspecialidades } from './../models/especialidades';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  especialidad = {
    IdEspecialidad: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerEspecialidades(): Observable<any>{
    this.especialidad.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerEspecialidades`, this.especialidad);
  }

  ServicioObtenerDatosEspecialidad(id: number): Observable<any>{
    this.especialidad.IdEspecialidad = id;
    this.especialidad.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosEspecialidad`, this.especialidad);
  }

  ServerEliminarEspecialidad(especialidad: DatosEspecialidades): Observable<any>{
    this.especialidad.IdEspecialidad = especialidad.IdEspecialidad;
    this.especialidad.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarEspecialidad`, this.especialidad);
  }

  ServerAgregarEspecialidad(especialidad: AgregarActualizarEspecialidad): Observable<any>{
    especialidad.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarEspecialidad`, especialidad);
  }

  ServerActualizarEspecialidad(especialidad: AgregarActualizarEspecialidad): Observable<any>{
    especialidad.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarEspecialidad`, especialidad);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
