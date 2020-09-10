import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  URL_SPOTIFY: string = 'https://api.spotify.com/v1/';
  Token: string = 'Bearer BQA0DpcQcQ7DJM8o2LaNowKqBVUYV7DL_gNH3D4BAB5LYuJG2UQ8EqaFydVwTtTFSRxR6rsiU0fwdOgwajk'

  constructor(private httpClient: HttpClient) { }

  GetNewReleases(){
    const headers = new HttpHeaders({
      'Authorization': this.Token
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}browse/new-releases`, { headers }).pipe(
      map( data =>{
        return data['albums'].items;
      } )
    );
  }

  GetArtistas(buscar: string){
    const headers = new HttpHeaders({
      'Authorization': this.Token
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}search?q=${ buscar }&type=artist`, { headers }).pipe(
      map( data =>{
        return data['artists'].items;
      })
    );
  }

  GetArtista(id: string){
    const headers = new HttpHeaders({
      'Authorization': this.Token
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}artists/${ id }`, { headers });
  }

  GetTopTracksArtista(id: string){
    const headers = new HttpHeaders({
      'Authorization': this.Token
    });

    return this.httpClient.get(`${this.URL_SPOTIFY}artists/${ id }/top-tracks?country=ES`, { headers }).pipe(
      map( data =>{
        return data['tracks'];
      })
    );
  }
}
