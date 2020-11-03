import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { ActualizarAgregarEvaluacionAplicadaDetalle, DatosEvaluacionAplicadaDetalle } from 'app/models/evaluaciones-aplicadas-detalle';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesAplicadasDetalleService {
  evaluacionAplicadaDetalle = {
    IdEvaluacionAplicadaDetalle: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerEvaluacionesAplicadasDetalle(): Observable<any>{
    this.evaluacionAplicadaDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerEvaluacionesAplicadasDetalle`, this.evaluacionAplicadaDetalle);
  }

  ServicioObtenerDatosEvaluacionAplicadaDetalle(id: number): Observable<any>{
    this.evaluacionAplicadaDetalle.IdEvaluacionAplicadaDetalle = id;
    this.evaluacionAplicadaDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosEvaluacionAplicadaDetalle`, this.evaluacionAplicadaDetalle);
  }

  ServerEliminarEvaluacionAplicadaDetalle(evaluacionAplicadaDetalle: DatosEvaluacionAplicadaDetalle): Observable<any>{
    this.evaluacionAplicadaDetalle.IdEvaluacionAplicadaDetalle = evaluacionAplicadaDetalle.IdEvaluacionAplicadaDetalle;
    this.evaluacionAplicadaDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarEvaluacionAplicadaDetalle`, this.evaluacionAplicadaDetalle);
  }

  ServerAgregarEvaluacionAplicadaDetalle(evaluacionAplicadaDetalle: ActualizarAgregarEvaluacionAplicadaDetalle): Observable<any>{
    evaluacionAplicadaDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarEvaluacionAplicadaDetalle`, evaluacionAplicadaDetalle);
  }

  ServerActualizarEvaluacionAplicadaDetalle(evaluacionAplicadaDetalle: ActualizarAgregarEvaluacionAplicadaDetalle): Observable<any>{
    evaluacionAplicadaDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarEvaluacionAplicadaDetalle`, evaluacionAplicadaDetalle);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
