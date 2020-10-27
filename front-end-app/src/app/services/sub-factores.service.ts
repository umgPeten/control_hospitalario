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

  ServicioObtenerSubFactores(): Observable<any>{
    this.subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerSubFactores`, this.subfactor);
  }

  ServicioObtenerDatosSubFactor(id: number): Observable<any>{
    this.subfactor.IdSubFactor = id;
    this.subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosSubFactor`, this.subfactor);
  }

  ServerEliminarSubFactor(subfactor: DatosSubFactores): Observable<any>{
    this.subfactor.IdSubFactor = subfactor.IdSubFactor;
    this.subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarSubFactor`, this.subfactor);
  }

  ServerAgregarSubFactor(subfactor: ActualizarAgregarSubFactores): Observable<any>{
    subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarSubFactor`, subfactor);
  }

  ServerActualizarSubFactor(subfactor: ActualizarAgregarSubFactores): Observable<any>{
    subfactor.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarSubFactor`, subfactor);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
