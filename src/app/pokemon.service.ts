import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Récupérer une liste de Pokémons avec pagination
  getPokemons(limit: number, offset: number): Observable<any> {
    console.log(`Fetching Pokemons: Limit=${limit}, Offset=${offset}`);
    return this.http.get(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  // Obtenir les détails d'un Pokémon spécifique par son ID
  getPokemonDetail(id: number): Observable<any> {
    console.log(`Fetching Pokemon Details for ID: ${id}`);
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
