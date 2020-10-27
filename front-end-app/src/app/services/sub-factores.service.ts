import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { ActualizarAgregarSubFactores, DatosSubFactores } from 'app/models/factores';

@Injectable({
  providedIn: 'root'
})
export class SubFactoresService {
  subfactor = {
    IdSubFactor: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerFactores(): Observable<any>{
    this.subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerFactores`, this.subfactor);
  }

  ServicioObtenerDatosFactor(id: number): Observable<any>{
    this.subfactor.IdSubFactor = id;
    this.subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosFactor`, this.subfactor);
  }

  ServerEliminarFactor(subfactor: DatosSubFactores): Observable<any>{
    this.subfactor.IdSubFactor = subfactor.IdSubFactor;
    this.subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarFactor`, this.subfactor);
  }

  ServerAgregarFactor(subfactor: ActualizarAgregarSubFactores): Observable<any>{
    subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarFactor`, subfactor);
  }

  ServerActualizarFactor(subfactor: ActualizarAgregarSubFactores): Observable<any>{
    subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarFactor`, subfactor);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
