import { Component, OnInit } from '@angular/core';

import { Planet } from 'src/app/models/planet';
import { Resident } from 'src/app/models/resident'; 
import { Film } from 'src/app/models/film';

import { StarWarsService } from 'src/app/services/star-wars.service';


@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  planet!: Planet;
  residents: Resident[] = [];
  films: Film[] = [];

  search!: string;

  constructor(private starWarsService: StarWarsService) { }

  ngOnInit(): void {
    this.getPlanet();
    this.getResidents();
    this.getFilms();
  }

  /** 
   * Функция обрабатывающая полученные данные с сервера, 
   * для формирования planet
  */
  getPlanet(): void {
    this.starWarsService.getPlanet().subscribe(planet => {
      this.planet = planet;
    })
  }

  /** 
   * Функция обрабатывающая полученные данные с сервера, 
   * для формирования списка residents
  */
  getResidents(): void {
    for(let resident of this.planet.residents) {
      let resident_info!: Resident;
      this.starWarsService.getResident(resident).subscribe(resident => {
        resident_info = resident;
        this.residents.push(resident_info);
      });
    }
  }

  /** 
   * Функция обрабатывающая полученные данные с сервера, 
   * для формирования списка films
  */
  getFilms(): void {
    for(let film of this.planet.films) {
      let film_info!: Film;
      this.starWarsService.getFilm(film).subscribe(film => {
        film_info = film;
        this.films.push(film_info);
      });
    }
  }

}
