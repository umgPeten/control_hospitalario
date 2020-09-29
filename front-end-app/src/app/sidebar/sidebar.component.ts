import { UsuariosServiceService } from 'app/services/usuarios-service.service';
import { Component, OnInit } from '@angular/core';
import { AfterLogin, Menu, ObtenerMenu } from 'app/models/usuarios';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    // { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    // { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: '/usuarios', title: 'Usuarios', icon: 'pe-7s-user', class:''},
    { path: '/menus', title: 'Menus', icon: 'pe-7s-helm', class:''},
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  
  menuItemsUsers: Menu;
  obtener: ObtenerMenu;
  usuario: AfterLogin;

  constructor(
    private usuariosService: UsuariosServiceService,
  ) { }

  ngOnInit() {
    this.obtener = new ObtenerMenu;
    // this.menuItemsUser = new Menu;
    this.usuario = new AfterLogin;

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    // console.log(this.menuItems);
    this.cargarUserMenu();
  }
  
  cargarUserMenu(){

    this.usuario = JSON.parse(sessionStorage.getItem("DatosUsuario"));
    this.obtener.IdModulo = 1; //TODO: que modulo mostrar cambiar de manera dinamica
    this.obtener.TxtToken = this.usuario.TxtToken;

    this.usuariosService.ServerMenuUsuario(this.obtener).subscribe( resultado =>{
      // console.log(resultado);
      this.menuItemsUsers = resultado;
    },
    error =>{
      // console.log(error)
    })
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  deslogueo(){
    sessionStorage.setItem("DatosUsuario", "");
    sessionStorage.setItem("SessionStarted", "0");
  }

  getUser(){
    return JSON.parse(sessionStorage.getItem("DatosUsuario")).TxtUsuario;
  }
}
