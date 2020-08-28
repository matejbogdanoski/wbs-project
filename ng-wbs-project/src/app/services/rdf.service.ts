import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { MoviePage } from '../interfaces/movie-page.interface';

@Injectable({
  providedIn: 'root'
})
export class RdfService {

  readonly allMovies = [
    {
      title: 'test 1',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2012-12-05',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 2',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2015-01-30',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 3',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2008-07-10',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 4',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2010-10-15',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 5',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-01-23',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 6',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 7',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 8',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie
  ];

  readonly favouriteMovies = [
    {
      title: 'test 2',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2015-01-30',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 4',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2010-10-15',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 5',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-01-23',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 7',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      thumbnail: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie
  ];

  readonly path = `api/data`;

  constructor(
    private _http: HttpClient
  ) { }

  getTestData(): Observable<any> {
    return this._http.get(`${this.path}/test`);
  }

  getLatestMovies(searchTerm: string = '', offset: number = 0): Observable<MoviePage> {
    const params = new HttpParams().set('searchTerm', searchTerm).set('offset', offset.toString());
    return this._http.get<MoviePage>(`${this.path}/sparql/movies`, { params });
  }

  getFavouriteMovies(): Observable<Movie[]> {
    return of(this.favouriteMovies);
  }

}
