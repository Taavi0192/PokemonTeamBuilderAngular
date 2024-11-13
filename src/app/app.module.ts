import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Ensure AppRoutingModule is imported
import { TeamManagementComponent } from './components/team-management/team-management.component';
import { PokemonSelectionComponent } from './components/pokemon-selection/pokemon-selection.component';
import { PokemonService } from './services/pokemon.service';
import { PokemonConfigurationComponent } from './components/pokemon-configuration/pokemon-configuration.component';  // Ensure PokemonService is imported

@NgModule({
  declarations: [
    AppComponent,
    TeamManagementComponent,
    PokemonSelectionComponent,
    PokemonConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Add AppRoutingModule here
    HttpClientModule,
    FormsModule  // Add FormsModule here
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
