import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/api';
  private pokeApiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient, private router: Router) { }

  getPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon`);
  }

  createTeam(team: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/teams`, team);
  }

  getTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getTeams`);
  }

  getPokemonDetails(urls: string[]): Observable<any[]> {
    return forkJoin(urls.map(url => this.http.get(url))).pipe(
      map((responses: any[]) => {
        return responses.map(response => ({
          name: response.name,
          imageUrl: response.sprites.other['official-artwork'].front_default
          // imageUrl: response.sprites.front_default
        }));
      })
    );
  }

  addPokemonToTeam(teamId: string, pokemon: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPokemonToTeam`, { teamId, pokemon }).pipe(
      tap(() => this.router.navigate([`/pokemon-configuration`, teamId , pokemon.name ]))
    );
  }

  removePokemonFromTeam(teamId: string, pokemonId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/removePokemonFromTeam`, { teamId, pokemonId });
  }

  deleteTeam(teamId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/deleteTeam`, { teamId });
  }

  getPokemonApiUrl(name: string): string {
    return `${this.pokeApiUrl}/pokemon/${name}`;
  }

  getPokemonConfiguration(teamId: string, pokemonName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getPokemonConfiguration/${teamId}/${pokemonName}`);
  }

  savePokemonConfiguration(teamId: string, pokemonName: string, configuration: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/savePokemonConfiguration`, { teamId, pokemonName, configuration });
  }

  getPokemonMoves(name: string): Observable<any> {
    return this.http.get(`${this.pokeApiUrl}/pokemon/${name}`).pipe(
      map((response: any) => response.moves)
    );
  }
}
