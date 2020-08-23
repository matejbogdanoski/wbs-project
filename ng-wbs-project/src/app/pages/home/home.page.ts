import { Component, OnInit } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  displayData: any;
  movies: Movie[];
  form: FormGroup = this.formDefinition;

  constructor(
    private _service: RdfService,
    private _builder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this._service.getTestData().subscribe(data => {
    //   this.displayData = data;
    // });
    this._service.getLatestMovies().subscribe(data => this.movies = data);
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
