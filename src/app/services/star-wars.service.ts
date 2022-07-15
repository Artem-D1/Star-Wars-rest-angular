import { Injectable } from '@angular/core';

import { Observable, ObservableInput } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs';

import { Planets } from '../models/planets';
import { Planet } from '../models/planet';
import { Resident } from '../models/resident';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  planet!: Planet;

  constructor(private http: HttpClient) { }

  /** 
   * функция отлова ошибок при запросе к серверу 
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} faild: ${error.message}`);
      return of(result as T);
    };
  }

  /** 
    * GET запрос для получения planets
  */
  getPlanets(url:string): Observable<Planets> {

    return this.http.get<Planets>(url).pipe(
      tap(() => console.log('fetched planets')),
      catchError(this.handleError<Planets>('getUsers'))
    );
  }

  /** 
   * GET запрос для получения planets(новые страницы)
  */
  getNewPagePlanets(url:string): Observable<Planets> {

    return this.http.get<Planets>(url).pipe(
      tap(() => console.log('fetched planets')),
      catchError(this.handleError<Planets>('getUsers'))
    );
  }

  /** 
   * GET запрос для получения resident
  */
  getResident(url: string): Observable<Resident> {

    return this.http.get<Resident>(url).pipe(
      tap(() => console.log('fetched planet')),
      catchError(this.handleError<Resident>('getResident'))
    );
  }

  /** 
   * GET запрос для получения film
  */
  getFilm(url: string): Observable<Film> {
    return this.http.get<Film>(url).pipe(
      tap(() => console.log('fetched film')),
      catchError(this.handleError<Film>('getFilm'))
    );
  }

  /** 
   * Функция получающая planet с planet-list
  */
  handOverPlanet(planet: Planet) {
    this.planet = planet;
  }

  /** 
   * Функция возвражающая planet для planet-info
  */
  getPlanet(): Observable<Planet> {
    return of(this.planet);
  }
  

}
