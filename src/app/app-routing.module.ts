import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamManagementComponent } from './components/team-management/team-management.component';
import { PokemonSelectionComponent } from './components/pokemon-selection/pokemon-selection.component';
import { PokemonConfigurationComponent } from './components/pokemon-configuration/pokemon-configuration.component';

const routes: Routes = [
  { path: '', redirectTo: '/team-management', pathMatch: 'full' },
  { path: 'team-management', component: TeamManagementComponent },
  { path: 'pokemon-selection', component: PokemonSelectionComponent },
  // { path: '**', redirectTo: '/team-management' },
  { path: 'pokemon-configuration/:teamId/:pokemonName', component: PokemonConfigurationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
