import { DatosPuestos, AgregarActualizarPuesto } from './../models/puestos';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  puesto = {
    IdPuesto: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerPuestos(): Observable<any>{
    this.puesto.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerPuestos`, this.puesto);
  }

  ServicioObtenerDatosPuesto(id: number): Observable<any>{
    this.puesto.IdPuesto = id;
    this.puesto.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosPuesto`, this.puesto);
  }

  ServerEliminarPuesto(puesto: DatosPuestos): Observable<any>{
    this.puesto.IdPuesto = puesto.IdPuesto;
    this.puesto.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarPuesto`, this.puesto);
  }

  ServerAgregarPuesto(puesto: AgregarActualizarPuesto): Observable<any>{
    puesto.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarPuesto`, puesto);
  }

  ServerActualizarPuesto(puesto: AgregarActualizarPuesto): Observable<any>{
    puesto.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarPuesto`, puesto);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
