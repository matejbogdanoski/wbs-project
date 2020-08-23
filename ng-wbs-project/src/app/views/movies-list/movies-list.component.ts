import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieDetailsDialog } from '../../dialogs/movie-details/movie-details.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  @Input() movies: Movie[];

  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onDialogOpen(movie: Movie) {
    this._dialog.open(MovieDetailsDialog, { data: movie });
  }
}
