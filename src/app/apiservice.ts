import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { COUNTRY_API, MOVIE_API } from './tokens';
import { Country, Movie } from './models';
import { Observable } from 'rxjs';

const API_KEY = 'ad4d2d35';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject(MOVIE_API) private movieapi: string,
    @Inject(COUNTRY_API) private countryapi: string
  ) {}

  getMovie(moviename: string): Observable<Movie | any> {
    const params = new HttpParams().set('apikey', API_KEY).set('t', moviename);
    return this.http.get<Movie>(this.movieapi, { params });
  }

  getCountry(countryname: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countryapi}${countryname}`);
  }
}
