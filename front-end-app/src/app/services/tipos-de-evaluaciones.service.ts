import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { ActualizarAgregarTipoDeEvaluacion, DatosTipoDeEvaluacion } from 'app/models/tipos-de-evaluaciones';

@Injectable({
  providedIn: 'root'
})
export class TiposDeEvaluacionesService {
  tipoDeEvaluacion = {
    IdTipoDeEvaluacion: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerTiposDeEvaluacionesService(): Observable<any>{
    this.tipoDeEvaluacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerTiposDeEvaluacion`, this.tipoDeEvaluacion);
  }

  ServicioObtenerDatosTipoDeEvaluacion(id: number): Observable<any>{
    this.tipoDeEvaluacion.IdTipoDeEvaluacion = id;
    this.tipoDeEvaluacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosTipoDeEvaluacion`, this.tipoDeEvaluacion);
  }

  ServerEliminarTipoDeEvaluacion(tipoDeEvaluacion: DatosTipoDeEvaluacion): Observable<any>{
    this.tipoDeEvaluacion.IdTipoDeEvaluacion = tipoDeEvaluacion.IdTipoDeEvaluacion;
    this.tipoDeEvaluacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarTipoDeEvaluacion`, this.tipoDeEvaluacion);
  }

  ServerAgregarTipoDeEvaluacion(tipoDeEvaluacion: ActualizarAgregarTipoDeEvaluacion): Observable<any>{
    tipoDeEvaluacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarTiposDeEvaluacion`, tipoDeEvaluacion);
  }

  ServerActualizarTipoDeEvaluacion(tipoDeEvaluacion: ActualizarAgregarTipoDeEvaluacion): Observable<any>{
    tipoDeEvaluacion.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarTipoDeEvaluacion`, tipoDeEvaluacion);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
