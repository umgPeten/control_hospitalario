import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     constructor(
        public dialogo: MatDialog,
        public location: Location,
        private spotify: SpotifyService
      ) {}

    ngOnInit(){
      this.obtenerTokenSpotify();
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }

  obtenerTokenSpotify(){
    this.spotify.getToken().subscribe( resultado =>{
      sessionStorage.setItem('spotify', `Bearer ${resultado['access_token']}`);
    },
    error =>{
      console.log(error);
    });

    setInterval(() => {
      console.log("Hola si tiene token y lo pide");
        this.spotify.getToken().subscribe( resultado =>{
            sessionStorage.setItem('spotify', `Bearer ${resultado['access_token']}`);
        },
        error =>{
          console.log(error);
        });
    }, 6 * 10000 * 30);// tiempo en milisegundos ( 6 * 10000 * 30) = 1800000 = 30 minutos
  }
}
