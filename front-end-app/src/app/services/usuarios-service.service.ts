import { AfterLogin } from 'app/models/usuarios';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { NewUser, Login, ModUsuario, ObtenerMenu } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {
  AUTH_SERVER: string = "http://localhost:50708/api/";
  private TxtToken: String;
  public intentoDeAcceso = "";
  DatosUsuarioActivo: AfterLogin

  constructor(
    private HttpClient: HttpClient
  ) { 
    this.DatosUsuarioActivo = new AfterLogin;
    this.DatosUsuarioActivo = JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }

  ServerInicioDeSesion(login: Login): Observable<any>{
    return this.HttpClient.post(`${this.AUTH_SERVER}InicioDeSesion`, login); 
  }

  ServerAgregarUsuario(user: NewUser): Observable<any>{
    user.TxtToken = this.DatosUsuarioActivo.TxtToken;

    return this.HttpClient.post(`${this.AUTH_SERVER}agregarusuario`, user);
  }

  ServerObtenerUsuarios(): Observable<any>{
    let token = {
      TxtToken: ''
    };
    token.TxtToken = this.DatosUsuarioActivo.TxtToken;

    return this.HttpClient.post(`${this.AUTH_SERVER}ObtenerUsuarios`, token);
  }

  ServerEliminarUsuario(IdUsuario: any): Observable<any>{
    IdUsuario.TxtToken = this.DatosUsuarioActivo.TxtToken;

    return this.HttpClient.post(`${this.AUTH_SERVER}EliminarUsuario`, IdUsuario);
  }

  ServerObtenerDatosUsuario(IdUsuario: any): Observable<any>{
    IdUsuario.TxtToken = this.DatosUsuarioActivo.TxtToken;

    return this.HttpClient.post(`${this.AUTH_SERVER}ObtenerDatosUsuario`, IdUsuario);
  }

  ServerActualizarUsuario(user: ModUsuario): Observable<any>{
    user.TxtToken = this.DatosUsuarioActivo.TxtToken;

    return this.HttpClient.post(`${this.AUTH_SERVER}ActualizarUsuario`, user);
  }

  ServerMenuUsuario(menu: ObtenerMenu): Observable<any>{
    return this.HttpClient.post(`${this.AUTH_SERVER}menuUsuario`, menu);
  }

  IsLoggedIn(url: string){
    const isLogged = sessionStorage.getItem("SessionStarted");
    if(isLogged !== "1"){
      this.intentoDeAcceso = url;
      return false;
    }
    return true;
  }
}
