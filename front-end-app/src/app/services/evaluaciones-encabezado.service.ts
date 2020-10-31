import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActualizarAgregarEvaluacionEncabezado, DatosEvaluacionEncabezado } from 'app/models/evaluaciones-encabezado';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesEncabezadoService {
  evaluacionEncabezado = {
    IdEvaluacionEncabezado: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerEvaluacionesEncabezado(): Observable<any>{
    this.evaluacionEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerEvaluacionesencabezado`, this.evaluacionEncabezado);
  }

  ServicioObtenerDatosTipoDeEvaluacion(id: number): Observable<any>{
    this.evaluacionEncabezado.IdEvaluacionEncabezado = id;
    this.evaluacionEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosEvaluacionEncabezado`, this.evaluacionEncabezado);
  }

  ServerEliminarEvaluacionEncabezado(evaluacionEncabezado: DatosEvaluacionEncabezado): Observable<any>{
    this.evaluacionEncabezado.IdEvaluacionEncabezado = evaluacionEncabezado.IdEvaluacionEncabezado;
    this.evaluacionEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarEvaluacionEncabezado`, this.evaluacionEncabezado);
  }

  ServerAgregarEvaluacionEncabezado(evaluacionEncabezado: ActualizarAgregarEvaluacionEncabezado): Observable<any>{
    evaluacionEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarEvaluacionEncabezado`, evaluacionEncabezado);
  }

  ServerActualizarEvaluacionEncabezado(evaluacionEncabezado: ActualizarAgregarEvaluacionEncabezado): Observable<any>{
    evaluacionEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarEvaluacionEncabezado`, evaluacionEncabezado);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
