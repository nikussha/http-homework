import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryPopulation, SecondMovie } from '../models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const API_KEY = 'ad4d2d35';

@Injectable()
export class FetchApi {
  constructor(private http: HttpClient) {}
  getMovie(moviename: string): Observable<any> {
    const params = new HttpParams().set('apikey', API_KEY).set('t', moviename);
    return this.http.get<any>(environment.movieapi, { params });
  }

  getCountry(countryname: string): Observable<CountryPopulation[]> {
    return this.http.get<CountryPopulation[]>(
      `${environment.countryapi}${countryname} `
    );
  }
}
