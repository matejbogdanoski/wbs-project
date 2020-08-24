import { Component, OnInit } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';
import { shareReplay } from 'rxjs/operators';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  displayData: any;
  movies: Movie[];
  form: FormGroup = this.formDefinition;
  loading: boolean = true;

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
      this.movies = data;
    });
  }

  get formDefinition() {
    return this._builder.group({
      searchTerm: new FormControl('')
    });
  }

  onSubmit() {
    const searchTerm = this.form.value;
    console.log(searchTerm);
  }

}
