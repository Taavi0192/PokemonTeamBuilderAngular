import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-configuration',
  templateUrl: './pokemon-configuration.component.html',
  styleUrls: ['./pokemon-configuration.component.css']
})
export class PokemonConfigurationComponent implements OnInit {
  teamId: string = '';
  pokemonName: string = '';
  pokemonStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0
  };
  pokemonMoves = {
    move1: '',
    move2: '',
    move3: '',
    move4: ''
  };
  moves: any[] = [];

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId')!;
    this.pokemonName = this.route.snapshot.paramMap.get('pokemonName')!;

    // Load existing configuration if available
    this.loadConfiguration();

    this.pokemonService.getPokemonMoves(this.pokemonName).subscribe(moves => {
      this.moves = moves.map((move: any) => move.move.name);
    });
  }

  loadConfiguration() {
    // Fetch the existing configuration from the backend (if any)
    this.pokemonService.getPokemonConfiguration(this.teamId, this.pokemonName).subscribe({
      next: (config) => {
        if (config) {
          this.pokemonStats = config.stats;
          this.pokemonMoves = config.moves;
        }
      },
      error: (err) => console.error('Error loading configuration:', err)
    });
  }

  saveConfiguration() {
    const configuration = {
      stats: this.pokemonStats,
      moves: this.pokemonMoves
    };

    this.pokemonService.savePokemonConfiguration(this.teamId, this.pokemonName, configuration).subscribe({
      next: (response) => console.log('Configuration saved:', response),
      error: (err) => console.error('Error saving configuration:', err)
    });
  }
}
