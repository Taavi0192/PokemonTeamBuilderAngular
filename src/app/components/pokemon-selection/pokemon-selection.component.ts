import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokemon-selection',
  templateUrl: './pokemon-selection.component.html',
  styleUrls: ['./pokemon-selection.component.css']
})
export class PokemonSelectionComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  teams: any[] = [];
  selectedTeamId: string = '';
  selectedTeam: any;
  searchQuery: string = '';
  errorMessage: string = '';

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['teamId']) {
        this.selectedTeamId = params['teamId'];
        this.loadTeams();
      } else {
        this.loadTeams();
      }
    });
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons().subscribe((data: any[]) => {
      const urls = data.map(pokemon => this.pokemonService.getPokemonApiUrl(pokemon.name));
      this.pokemonService.getPokemonDetails(urls).subscribe(details => {
        this.pokemons = details;
        this.filteredPokemons = details;
      });
    });
  }

  loadTeams() {
    this.pokemonService.getTeams().subscribe((data: any[]) => {
      this.teams = data;
      if (this.selectedTeamId) {
        this.selectedTeam = this.teams.find(team => team._id === this.selectedTeamId);
      }
    });
  }

  filterPokemons() {
    this.filteredPokemons = this.pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addPokemonToTeam(pokemon: any) {
    if (!this.selectedTeamId) {
      this.errorMessage = 'Please select a team first.';
      return;
    }

    if (this.selectedTeam.teamMembers.length >= 6) {
      this.errorMessage = 'Team cannot have more than 6 Pokémon.';
      return;
    }

    const newPokemon = {
      pokemonID: pokemon.name,
      pokemonName: pokemon.name,
      imageUrl: pokemon.imageUrl
    };

    this.pokemonService.addPokemonToTeam(this.selectedTeamId, newPokemon).subscribe({
      next: (response) => {
        this.selectedTeam = response;
        this.errorMessage = '';
        console.log('Pokemon added to team:', response);
      },
      error: (err) => {
        this.errorMessage = err.error;
        console.error('Error adding Pokemon to team:', err);
      },
      complete: () => {
        this.router.navigate(['/pokemon-configuration', this.selectedTeamId, pokemon.name]);
      }
    });
  }

  removePokemonFromTeam(pokemonId: string) {
    if (!this.selectedTeamId) {
      this.errorMessage = 'Please select a team first.';
      return;
    }

    this.pokemonService.removePokemonFromTeam(this.selectedTeamId, pokemonId).subscribe({
      next: (response) => {
        this.selectedTeam = response;
        this.errorMessage = '';
        console.log('Pokemon removed from team:', response);
      },
      error: (err) => {
        this.errorMessage = err.error;
        console.error('Error removing Pokemon from team:', err);
      }
    });
  }

  selectTeam(teamId: string) {
    this.selectedTeamId = teamId;
    this.selectedTeam = this.teams.find(team => team._id === teamId);
  }

  emptySlots(count: number): number[] {
    return new Array(6 - count);
  }
}
