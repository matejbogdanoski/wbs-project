import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../interfaces/movie.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RdfService } from '../../services/rdf.service';
import { Observable } from 'rxjs';

export interface MovieDetailsDialogData {
  movie: Movie;
  showDelete: boolean;
}

@Component({
  templateUrl: './movie-details.dialog.html',
  styleUrls: ['./movie-details.dialog.scss']
})
export class MovieDetailsDialog implements OnInit {

  undo = false;
  movie: Movie;
  showDelete: boolean;

  constructor(public dialogRef: MatDialogRef<MovieDetailsDialog>,
              @Inject(MAT_DIALOG_DATA) public data: MovieDetailsDialogData,
              private _snackBar: MatSnackBar,
              private _service: RdfService) { }

  ngOnInit(): void {
    this.movie = this.data.movie;
    this.showDelete = this.data.showDelete;
  }

  addToFavourites() {
    this.undoAction(this._service.createFavourite(this.movie), 'Successfully added to favourites!');
  }

  deleteFavourite() {
    this._service.deleteFavourite(this.movie?.resource).subscribe(() => {
      this.dialogRef.close({ reloadPage: true });
      this._snackBar.open('Successfully deleted from favourites!', '', {
        duration: 2000
      });
    });
  }

  undoAction(observable: Observable<any>, successText: string) {
    this.undo = false;
    const snackBarRef = this._snackBar.open(successText, 'Undo', {
      duration: 2000
    });

    setTimeout(() => {
      if (!this.undo) {
        observable.subscribe();
      }
    }, 2000);

    snackBarRef.onAction().subscribe(() => {
      this.undo = true;
    });
  }
}
