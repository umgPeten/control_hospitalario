import { ROUTES } from './../shared/sidebar/sidebar.component';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { NewUser, Login, ModUsuario, ObtenerMenu } from '../models/usuarios';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {
  // AUTH_SERVER: string = "http://localhost:50708/api/";
  // private TxtToken: String;
  public intentoDeAcceso = "";
  location: Location;
  private listTitles: any[];
  IdUser = {
    IdUsuario: 0,
    TxtToken: ''
  };

  constructor(
    location: Location,
    private HttpClient: HttpClient
  ) { 
    this.location = location;
  }

  ServerInicioDeSesion(login: Login): Observable<any>{
    return this.HttpClient.post(`${environment.AUTH_SERVER}InicioDeSesion`, login); 
  }

  ServerAgregarUsuario(user: NewUser): Observable<any>{
    user.TxtToken = this.getToken().TxtToken;

    return this.HttpClient.post(`${environment.AUTH_SERVER}agregarusuario`, user);
  }

  ServerObtenerUsuarios(): Observable<any>{
    let token = {
      TxtToken: this.getToken().TxtToken
    };
    
    return this.HttpClient.post(`${environment.AUTH_SERVER}ObtenerUsuarios`, token);
  }

  ServerEliminarUsuario(TxtToken: any): Observable<any>{
    TxtToken.TxtToken = this.getToken().TxtToken;

    return this.HttpClient.post(`${environment.AUTH_SERVER}EliminarUsuario`, TxtToken);
  }

  ServerObtenerDatosUsuario(IdUsuario: any): Observable<any>{
    IdUsuario.TxtToken = this.getToken().TxtToken;

    return this.HttpClient.post(`${environment.AUTH_SERVER}ObtenerDatosUsuario`, IdUsuario);
  }

  ServerActualizarUsuario(user: ModUsuario): Observable<any>{
    user.TxtToken = this.getToken().TxtToken;

    return this.HttpClient.post(`${environment.AUTH_SERVER}ActualizarUsuario`, user);
  }

  ServerMenuUsuario(menu: ObtenerMenu): Observable<any>{
    return this.HttpClient.post(`${environment.AUTH_SERVER}menuUsuario`, menu);
  }

  getToken(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
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
