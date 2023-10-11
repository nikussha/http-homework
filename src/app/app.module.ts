import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirsttaskComponent } from './firsttask/firsttask.component';
import { SecondtaskComponent } from './secondtask/secondtask.component';
import { HttpClientModule } from '@angular/common/http';
import { MOVIE_API, COUNTRY_API } from './tokens';
import { ReactiveFormsModule } from '@angular/forms';
import { DateCalcPipe } from './datecalc.pipe';
import { namesPipe } from './onlynames.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FirsttaskComponent,
    SecondtaskComponent,
    DateCalcPipe,
    namesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MOVIE_API, useValue: environment.movieapi },
    { provide: COUNTRY_API, useValue: environment.countryapi },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
