import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  URL_SPOTIFY: string = 'https://api.spotify.com/v1/';
  Token: string = 'Bearer BQCs6KyI4ezw5tsaStYJHc1jP1Du9NezAvh6vXepSzYWR9XCBLhQ_cS0bWk5rKA06FnNlJtIGP6lAgJ_5Jk'

  constructor(private httpClient: HttpClient) { }

  getNewReleases(){
    const headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('token')
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}browse/new-releases`, { headers }).pipe(
      map( data =>{
        return data['albums'].items;
      } )
    );
  }

  getArtistas(buscar: string){
    const headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('token')
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}search?q=${ buscar }&type=artist&limit=5`, { headers }).pipe(
      map( data =>{
        return data['artists'].items;
      })
    );
  }

  getArtista(id: string){
    const headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('token')
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}artists/${ id }`, { headers });
  }

  getTopTracksArtista(id: string){
    const headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('token')
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}artists/${ id }/top-tracks?country=ES`, { headers }).pipe(
      map( data =>{
        return data['tracks'];
      })
    );
  }

  getToken(){
    return this.httpClient.get(`https://spotify-get-token.herokuapp.com/spotify/8fc714e5e5ea4ae8bd244388f3f16bf2/cb2f790b0bb249fe8093fc5a436a62ba`);
  }
}
