import { Component, OnInit, ViewChild } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';
import { shareReplay } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  movies: Movie[];
  form: FormGroup = this.formDefinition;
  loading: boolean = true;

  length: number;
  pageSize = 9;

  constructor(
    private _service: RdfService,
    private _builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._service.getLatestMovies()
      .pipe(
        shareReplay(1)
      ).subscribe(data => {
      this.loading = false;
      this.movies = data.movies;
      this.length = data.length;
    });
  }

  get formDefinition() {
    return this._builder.group({
      searchTerm: new FormControl('')
    });
  }

  onSubmit() {
    const searchTerm = this.form.get('searchTerm').value;
    this.loading = true;
    this._service.getLatestMovies(searchTerm)
      .pipe(
        shareReplay(1)
      ).subscribe(data => {
      this.paginator.pageIndex = 0;
      this.movies = data.movies;
      this.length = data.length;
      this.loading = false;
    });
  }

  onPageChange(pageEvent: PageEvent) {
    const searchTerm = this.form.get('searchTerm').value || '';
    this.loading = true;
    this._service.getLatestMovies(searchTerm, pageEvent.pageIndex)
      .pipe(
        shareReplay(1)
      ).subscribe(data => {
      this.movies = data.movies;
      this.length = data.length;
      this.loading = false;
    });
  }

}
