import { Country } from './../models';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  concatMap,
  delay,
  filter,
  from,
  map,
  merge,
  mergeMap,
  of,
  switchMap,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../apiservice';
import { Movie } from '../models';

@Component({
  selector: 'app-firsttask',
  templateUrl: './firsttask.component.html',
  styleUrls: ['./firsttask.component.scss'],
})
export class FirsttaskComponent implements OnInit {
  moviename = new FormControl();
  movie$: Observable<Movie | null> | undefined = undefined;
  releaseDate$: Observable<string> | undefined;
  actors$: Observable<string> | undefined;
  countryAndFlag: Observable<any> | undefined;
  errorHandler = new BehaviorSubject<boolean | string>(false);

  constructor(private apiservice: ApiService) {}
  ngOnInit(): void {}

  sendRequest() {
    let movie = this.moviename.value;
    if (movie) {
      this.movie$ = this.apiservice.getMovie(movie).pipe(
        switchMap((response) => {
          if (response.Response === 'False') {
            this.errorHandler.next('Please try again');
            return of(null);
          }
          this.errorHandler.next(false);
          return of(response);
        })
      );

      this.actors$ = this.movie$.pipe(map((movie) => movie?.Actors ?? ''));

      this.releaseDate$ = this.movie$.pipe(
        map((movie) => movie?.Released ?? '')
      );

      this.countryAndFlag = this.movie$
        .pipe(map((movie) => movie!.Country))
        .pipe(
          mergeMap((countryname) => {
            let splitted = countryname.split(', ');
            return from(splitted);
          }),
          mergeMap((country: string) => {
            return this.apiservice.getCountry(country);
          }),
          map((response: Country[]) => response[0]),
          map((country: Country) => {
            let currencies = Object.values(country.currencies);
            let flag = country.flags.png;
            return {
              flag,
              currencies,
            };
          }),
          toArray(),
          catchError((err) => {
            this.errorHandler.next('Please try again');
            return of(null);
          }),
          delay(1000),
          tap(() => this.errorHandler.next(false))
        );
    }
    this.moviename.reset();
  }
}
