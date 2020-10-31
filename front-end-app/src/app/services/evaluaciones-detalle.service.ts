import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActualizarAgregarEvaluacionDetalle, DatosEvaluacionDetalle } from 'app/models/evaluaciones-detalle';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesDetalleService {
  evaluacionDetalle = {
    IdEvaluacionDetalle: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  ServicioObtenerEvaluacionesDetalle(): Observable<any>{
    this.evaluacionDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerEvaluacionesDetalle`, this.evaluacionDetalle);
  }

  ServicioObtenerDatosEvaluacionDetalle(id: number): Observable<any>{
    this.evaluacionDetalle.IdEvaluacionDetalle = id;
    this.evaluacionDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosEvaluacionDetalle`, this.evaluacionDetalle);
  }

  ServerEliminarEvaluacionDetalle(evaluacionDetalle: DatosEvaluacionDetalle): Observable<any>{
    this.evaluacionDetalle.IdEvaluacionDetalle = evaluacionDetalle.IdEvaluacionDetalle;
    this.evaluacionDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarEvaluacionDetalle`, this.evaluacionDetalle);
  }

  ServerAgregarEvaluacionDetalle(evaluacionDetalle: ActualizarAgregarEvaluacionDetalle): Observable<any>{
    evaluacionDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarEvaluacionDetalle`, evaluacionDetalle);
  }

  ServerActualizarEvaluacionDetalle(evaluacionDetalle: ActualizarAgregarEvaluacionDetalle): Observable<any>{
    evaluacionDetalle.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarEvaluacionDetalle`, evaluacionDetalle);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
