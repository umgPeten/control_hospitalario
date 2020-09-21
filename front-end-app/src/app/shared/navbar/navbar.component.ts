import { SpotifyService } from '../../services/spotify.service';
import { DialogoNosotrosComponent } from './../../components/emergentes/dialogo-nosotros/dialogo-nosotros.component';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    buscar: any;

    constructor(
        location: Location,
        private element: ElementRef,
        public dialogo: MatDialog,
        private spotify: SpotifyService
        ) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    //   this.obtenerTokenSpotify();
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Usuarios';
    }

    deslogueo(){
        sessionStorage.setItem("DatosUsuario", "");
        sessionStorage.setItem("SessionStarted", "0");
    }

    mostrarNosotros(){
        this.dialogo.open(DialogoNosotrosComponent)
    }

    buscador(buscar: string){
        if(buscar){
            this.spotify.getArtistas(buscar).subscribe(resultado => {
                this.buscar = resultado;
                // console.log(resultado);
            },
            error => {
                // console.log(error);
            })
        }
        else{
            this.buscar = null
        }
    }

    // obtenerTokenSpotify(){
    //     setInterval(() => {
    //         this.spotify.getToken().subscribe( resultado =>{
    //             sessionStorage.setItem('token', `Bearer ${resultado['access_token']}`);
    //         },
    //         error =>{
    //           console.log(error);
    //         });
    //     }, 6 * 10000 * 30);// tiempo en milisegundos ( 6 * 10000 * 30) = 1800000 = 30 minutos
    // }
}
