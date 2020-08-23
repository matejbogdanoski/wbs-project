import { Component, OnInit } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss']
})
export class FavouritesPage implements OnInit {

  movies: Movie[];

  constructor(private _service: RdfService) { }

  ngOnInit(): void {
    this._service.getFavouriteMovies().subscribe(data => this.movies = data);
  }

}
