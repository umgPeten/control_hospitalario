import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { ActualizarAgregarEvaluacionAplicadaEncabezado, DatosEvaluacionAplicadaEncabezado } from 'app/models/evaluaciones-aplicadas-encabezado';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesAplicadasEncabezadoService {
  evaluacionAplicadaEncabezado = {
    IdEvaluacionAplicadaEncabezado: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerEvaluacionesAplicadasEncabezado(): Observable<any>{
    this.evaluacionAplicadaEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerEvaluacionesAplicadasEncabezado`, this.evaluacionAplicadaEncabezado);
  }

  ServicioObtenerDatosEvaluacionAplicadaEncabezado(id: number): Observable<any>{
    this.evaluacionAplicadaEncabezado.IdEvaluacionAplicadaEncabezado = id;
    this.evaluacionAplicadaEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosEvaluacionAplicadaEncabezado`, this.evaluacionAplicadaEncabezado);
  }

  ServerEliminarEvaluacionAplicadaEncabezado(evaluacionAplicadaEncabezado: DatosEvaluacionAplicadaEncabezado): Observable<any>{
    this.evaluacionAplicadaEncabezado.IdEvaluacionAplicadaEncabezado = evaluacionAplicadaEncabezado.IdEvaluacionAplicadaEncabezado;
    this.evaluacionAplicadaEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarEvaluacionAplicadaEncabezado`, this.evaluacionAplicadaEncabezado);
  }

  ServerAgregarEvaluacionAplicadaEncabezado(evaluacionAplicadaEncabezado: ActualizarAgregarEvaluacionAplicadaEncabezado): Observable<any>{
    evaluacionAplicadaEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarEvaluacionAplicadaEncabezado`, evaluacionAplicadaEncabezado);
  }

  ServerActualizarEvaluacionAplicadaEncabezado(evaluacionAplicadaEncabezado: ActualizarAgregarEvaluacionAplicadaEncabezado): Observable<any>{
    evaluacionAplicadaEncabezado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarEvaluacionAplicadaEncabezado`, evaluacionAplicadaEncabezado);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
