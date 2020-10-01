import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { DatosRenglones, AgregarActualizarRenglon } from './../models/renglones';


@Injectable({
  providedIn: 'root'
})
export class RenglonesService {
 renglon = {
    IdRenglon: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerRenglones(): Observable<any>{
    this.renglon.TxtToken = this.getToken().TxtToken;
  
    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerRenglones`, this.renglon);
  }

  ServicioObtenerDatosRenglon(id: number): Observable<any>{
    this.renglon.IdRenglon = id;
    this.renglon.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosRenglon`, this.renglon);
  }

  ServerEliminarRenglon(renglon: DatosRenglones): Observable<any>{
    this.renglon.IdRenglon = renglon.IdRenglon;
    this.renglon.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarRenglon`, this.renglon);
  }

  ServerAgregarRenglon(renglon: AgregarActualizarRenglon): Observable<any>{
    renglon.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarRenglon`, renglon);
  }

  ServerActualizarRenglon(renglon: AgregarActualizarRenglon): Observable<any>{
    renglon.TxtToken = this.getToken().TxtToken;
    
    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarRenglon`, renglon);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }

  

}
