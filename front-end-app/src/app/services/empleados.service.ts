import { environment } from './../../environments/environment.prod';
import { ActualizarAgregarEmpleado } from './../models/empleados';
import { DatosEmpleado } from 'app/models/empleados';
// import { UsuariosServiceService } from 'app/services/usuarios-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  IdEmpleado = {
    IdEmpleado: 0,
    TxtToken: ''
  };

  constructor(
    private httpClient: HttpClient,
    // private usuariosService: UsuariosServiceService
  ) { }

  ServicioObtenerEmpleados(): Observable<any>{
    this.IdEmpleado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerEmpleados`, this.IdEmpleado);
  }

  ServicioObtenerDatosEmpleado(empleado: number): Observable<any>{
    this.IdEmpleado.IdEmpleado = empleado;
    this.IdEmpleado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ObtenerDatosEmpleado`, this.IdEmpleado);
  }

  ServerEliminarEmpleado(empleado: DatosEmpleado): Observable<any>{
    this.IdEmpleado.IdEmpleado = empleado.IdEmpleado;
    this.IdEmpleado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}EliminarEmpleado`, this.IdEmpleado);
  }

  ServerAgregarEmpleado(empleado: ActualizarAgregarEmpleado): Observable<any>{
    empleado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}AgregarEmpleado`, empleado);
  }

  ServerActualizarEmpleado(empleado: ActualizarAgregarEmpleado): Observable<any>{
    empleado.TxtToken = this.getToken().TxtToken;

    return this.httpClient.post(`${environment.AUTH_SERVER}ActualizarEmpleado`, empleado);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
