import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieDetailsDialog, MovieDetailsDialogData } from '../../dialogs/movie-details/movie-details.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  @Input() movies: Movie[];
  @Input() showDelete: boolean;

  @Output() reloadMovies = new EventEmitter<void>();

  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onDialogOpen(movie: Movie) {
    const showDelete = this.showDelete;
    this._dialog.open(MovieDetailsDialog, { data: { movie, showDelete } as MovieDetailsDialogData })
      .afterClosed()
      .subscribe(it => {
        if (it.reloadPage) {
          this.reloadMovies.emit();
        }
      });
  }
}
