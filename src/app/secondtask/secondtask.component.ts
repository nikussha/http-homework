import { Country, CountryPopulation, SecondMovie } from './../models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  catchError,
  delay,
  distinct,
  filter,
  flatMap,
  forkJoin,
  from,
  iif,
  map,
  merge,
  mergeMap,
  of,
  reduce,
  switchMap,
  tap,
  throwError,
  toArray,
  zip,
} from 'rxjs';
import { FetchApi } from './fetchApi.service';

@Component({
  selector: 'app-secondtask',
  templateUrl: './secondtask.component.html',
  styleUrls: ['./secondtask.component.scss'],
  providers: [FetchApi],
})
export class SecondtaskComponent {
  minutes$: Observable<number> | undefined;
  population$: Observable<number> | undefined;
  movies$: Observable<SecondMovie[] | null> | undefined;
  errorHandler$ = new BehaviorSubject(false);

  forms: FormGroup = new FormGroup({
    input1: new FormControl('', Validators.required),
    input2: new FormControl('', Validators.required),
    input3: new FormControl('', Validators.required),
  });

  constructor(private service: FetchApi) {}

  fetchData() {
    if (this.forms?.status === 'INVALID') {
      return;
    }
    const input1 = this.forms.get('input1')?.value.toLowerCase();
    const input2 = this.forms.get('input2')?.value.toLowerCase();
    const input3 = this.forms.get('input3')?.value.toLowerCase();

    const requests = [input1, input2, input3];

    this.movies$ = forkJoin(
      requests.map((moviename) =>
        this.service.getMovie(moviename).pipe(
          mergeMap((response) => {
            if (response.Response === 'False') {
              this.errorHandler$.next(true);
              return throwError(new Error(response.Error));
            }
            this.errorHandler$.next(false);
            return of(response);
          })
        )
      )
    ).pipe(
      catchError(() => {
        return of(null);
      })
    );
    this.minutes$ = this.movies$.pipe(
      filter((val) => val !== null),
      switchMap((val) => from(val as SecondMovie[])),
      map((val) => val.Runtime),
      reduce((acc, curr) => {
        let parsed = parseInt(curr);
        acc += parsed;
        return acc;
      }, 0)
    );

    this.population$ = this.movies$.pipe(
      filter((val) => !!val),
      switchMap((val) => from(val as SecondMovie[])),
      mergeMap((val) => val.Country.split(', ')),
      distinct(),
      mergeMap((country) => {
        return this.service.getCountry(country);
      }),
      map((countries: CountryPopulation[]) => {
        return countries[0].population;
      }),
      reduce((acc, curr) => (acc += curr))
    );

    this.forms.reset();
  }
}
