import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

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
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 2',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2015-01-30',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 3',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2008-07-10',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 4',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2010-10-15',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 5',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-01-23',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 6',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 7',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 8',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie
  ];

  readonly favouriteMovies = [
    {
      title: 'test 2',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2015-01-30',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 4',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2010-10-15',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 5',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-01-23',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie,
    {
      title: 'test 7',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      year: '2020-03-01',
      image: 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'
    } as Movie
  ];

  readonly path = `api/data`;

  constructor(
    private _http: HttpClient
  ) { }

  getTestData(): Observable<any> {
    return this._http.get(`${this.path}/test`);
  }

  getLatestMovies(): Observable<Movie[]> {
    return of(this.allMovies);
  }

  getFavouriteMovies(): Observable<Movie[]> {
    return of(this.favouriteMovies);
  }

}
