import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdfService {

  readonly path = `api/data`;

  constructor(
    private _http: HttpClient
  ) { }

  getTestData(): Observable<any> {
    return this._http.get(`${this.path}/test`);
  }

}
