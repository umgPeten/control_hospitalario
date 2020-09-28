import { UsuariosServiceService } from 'app/services/usuarios-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  IdUser = {
    IdUsuario: 0,
    TxtToken: ''
  };
  
  constructor(
    private HttpClient: HttpClient,
    private usuariosService: UsuariosServiceService
  ) { }

  ServicioObtenerEmpleados(): Observable<any>{
    this.IdUser.TxtToken = this.getToken().TxtToken;

    return this.HttpClient.post(`${this.usuariosService.AUTH_SERVER}ObtenerEmpleados`, this.IdUser);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }
}
