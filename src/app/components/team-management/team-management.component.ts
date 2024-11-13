import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {
  team = {
    teamName: '',
    description: '',
    teamMembers: [],
    teamItems: []
  };
  teams: any[] = [];
  selectedTeamId: string = '';
  showForm: boolean = false;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    this.loadTeams();
  }

  createTeam() {
    this.pokemonService.createTeam(this.team).subscribe({
      next: (response) => {
        console.log('Team created:', response);
        this.loadTeams();
      },
      error: (err) => console.error('Error creating team:', err)
    });
  }

  loadTeams() {
    this.pokemonService.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: (err) => console.error('Error fetching teams:', err)
    });
  }

  deleteTeam(teamId: string) {
    this.pokemonService.deleteTeam(teamId).subscribe({
      next: (response) => {
        console.log('Team deleted:', response);
        this.loadTeams();
        this.selectedTeamId = '';
      },
      error: (err) => console.error('Error deleting team:', err)
    });
  }

  editTeam(teamId: string) {
    this.selectedTeamId = teamId;
    this.router.navigate(['/pokemon-selection'], { queryParams: { teamId: this.selectedTeamId } });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
