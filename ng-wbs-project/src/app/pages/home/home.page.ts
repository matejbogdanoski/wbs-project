import { Component, OnInit } from '@angular/core';
import { RdfService } from '../../services/rdf.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  displayData: any;

  constructor(
    private _service: RdfService
  ) { }

  ngOnInit(): void {
    this._service.getTestData().subscribe(data => {
      this.displayData = data;
    });
  }

}
