import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.view.html',
  styleUrls: ['./movie-card.view.scss']
})
export class MovieCardView implements OnInit {

  @Input() movie: Movie;
  @Output() details = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {
  }

  getDetails() {
    this.details.emit(this.movie);
  }

}
