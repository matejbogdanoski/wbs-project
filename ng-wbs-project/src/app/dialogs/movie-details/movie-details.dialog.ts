import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../interfaces/movie.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './movie-details.dialog.html',
  styleUrls: ['./movie-details.dialog.scss']
})
export class MovieDetailsDialog implements OnInit {

  movie: Movie;

  constructor(public dialogRef: MatDialogRef<MovieDetailsDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Movie,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.movie = this.data;
  }

  onClose() {
    this.dialogRef.close();
  }

  addToFavourites() {
    this._snackBar.open('Successfully added to favourites!', 'Undo', {
      duration: 2000
    });
  }
}
