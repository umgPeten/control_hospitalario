import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { ActualizarAgregarFactores, DatosFactores } from 'app/models/factores';

@Injectable({
  providedIn: 'root'
})
export class FactoresService {
  factor = {
    IdFactor: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerFactores(): Observable<any>{
    this.factor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerFactores`, this.factor);
  }

  ServicioObtenerDatosFactor(id: number): Observable<any>{
    this.factor.IdFactor = id;
    this.factor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosFactor`, this.factor);
  }

  ServerEliminarFactor(factor: DatosFactores): Observable<any>{
    this.factor.IdFactor = factor.IdFactor;
    this.factor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarFactor`, this.factor);
  }

  ServerAgregarFactor(factor: ActualizarAgregarFactores): Observable<any>{
    factor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarFactor`, factor);
  }

  ServerActualizarFactor(factor: ActualizarAgregarFactores): Observable<any>{
    factor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarFactor`, factor);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
