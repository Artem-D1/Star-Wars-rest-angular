import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { PlanetInfoComponent } from './components/planet-info/planet-info.component';

const routes: Routes = [
  {path: '', component: PlanetsListComponent},
  {path: 'planet/:name', component:PlanetInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
