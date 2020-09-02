import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosServiceService } from './../services/usuarios/usuarios-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private router: Router,
    private usuariosServce: UsuariosServiceService
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.usuariosServce.IsLoggedIn(state.url)){
        return true;
      }
      this.router.navigate(['/login']);
      return true;
  }
  
}
