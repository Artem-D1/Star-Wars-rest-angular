import { Component, OnInit } from '@angular/core';

import { Planet } from 'src/app/models/planet';
import { Planets } from 'src/app/models/planets';

import { StarWarsService } from 'src/app/services/star-wars.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  planets: Planet[] = [];
  planet!: Planet;
  planetsInfo!: Planets;

  constructor(private starWarsService: StarWarsService) { }

  ngOnInit(): void {
    /** 
     * В зависимости от url находящегося в localStorage
     * формируется запрос на сервер
    */
    if (localStorage.getItem('url')) {
      this.getPlanets();
    } else {
      localStorage.setItem('url','https://swapi.dev/api/planets');
      this.getPlanets();
    }
  }

  /** 
   * Функция обрабатывающая полученные данные с сервера, 
   * для формирования списка planets
  */
  getPlanets(): void {
    let url = localStorage.getItem('url');
    this.starWarsService.getPlanets(url!).subscribe(planets => {
      this.planetsInfo = planets;
      this.planets = planets.results;
    });
  }

  /** 
   * Функция передающая в сервис информацию о выбранной
   * планете
  */
  sendPlanet(planet: Planet): void {
    this.starWarsService.handOverPlanet(planet);
  }

  /** 
   * Функция обрабатывающая полученные данные с сервера, 
   * для формирования списка planets(новые страницы)
  */
  showNewPage(url:string): void {
    localStorage.setItem('url',url);
    this.starWarsService.getNewPagePlanets(url).subscribe(planets => {
      this.planetsInfo = planets;
      this.planets = planets.results;
    });
  }
}

