import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor( private http: HttpClient) { }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQBDP7s_nXrI7PIL4bZdmtDm2iXwxHzXcQd6aVDIUzrQJk8QBOgyfbPSwy4T0fV81Rh3DRzhYq_OQfO6pL4'
    });
    return this.http.get(url, {headers});

  }
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map( (data: any) => data.albums.items));
  }
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
      .pipe(map((data: any) => data.artists.items));
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
      // .pipe(map((data: any) => data.artists.items));
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
     .pipe(map((data: any) => data.tracks));
  }
}
