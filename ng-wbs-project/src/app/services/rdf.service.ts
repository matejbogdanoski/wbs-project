import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { MoviePage } from '../interfaces/movie-page.interface';

@Injectable({
  providedIn: 'root'
})
export class RdfService {

  readonly path = `api/data`;

  constructor(
    private _http: HttpClient
  ) { }

  getLatestMovies(searchTerm: string = '', offset: number = 0): Observable<MoviePage> {
    const params = new HttpParams().set('searchTerm', searchTerm).set('offset', offset.toString());
    return this._http.get<MoviePage>(`${this.path}/sparql/movies`, { params });
  }

  getFavouriteMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(`${this.path}/favourites`);
  }

  createFavourite(request: Movie) {
    return this._http.post(`${this.path}/favourites`, request);
  }

  deleteFavourite(resource: string){
    const params = new HttpParams()
      .set('resource', resource);
    return this._http.delete(`${this.path}/favourites`, { params });
  }

}
