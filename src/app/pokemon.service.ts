// Importation des modules nécessaires depuis le package Angular core et HttpClient pour les requêtes HTTP.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importation des opérateurs RxJS pour la manipulation des observables.
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

// Définition de l'interface Pokemon pour typer les données de Pokémon.
//export permet de s'en servir dans un autre fichier ou on importera pokemon.service.ts
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

// Interface pour la réponse de la liste des Pokémon de l'API.
interface PokemonListResponse {
  results: { url: string }[];
}

// Interface pour les détails d'un Pokémon.
interface PokemonDetails {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

// Décorateur Injectable pour permettre l'injection de ce service dans d'autres classes.
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // URL de base de l'API PokeAPI.
  private apiUrl = 'https://pokeapi.co/api/v2';

  // Injection du service HttpClient pour effectuer des requêtes HTTP.
  constructor(private http: HttpClient) {}

  // Méthode pour obtenir la liste des Pokémon. Prend en paramètre la limite et le décalage.
  getPokemonList(
    limit: number = 100, // Valeur par défaut de la limite fixée à 100.
    offset: number = 0 // Valeur par défaut du décalage fixée à 0.
  ): Observable<PokemonListResponse> {
    // Retourne un Observable après avoir effectué une requête GET à l'API.
    return this.http.get<PokemonListResponse>(
      `${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`
    );
  }

  // Méthode pour obtenir tous les détails des Pokémon.
  getAllPokemonDetails(): Observable<Pokemon[]> {
    return this.getPokemonList().pipe(
      switchMap((pokemonListData) => {
        // Création d'un tableau de requêtes pour obtenir les détails de chaque Pokémon.
        const results = pokemonListData.results.map((pokemon) => {
          // Obtention de l'ID du Pokémon à partir de l'URL de l'API.
          const pokemonId = this.getPokemonIdFromUrl(pokemon.url);
          // Appel à la méthode getPokemonDetails() pour obtenir les détails du Pokémon.
          return this.getPokemonDetails(pokemonId).pipe(
            map((details) => ({
              // Mapping des détails du Pokémon dans un objet Pokemon.
              id: pokemonId, // ID du Pokémon
              name: details.name, // Nom du Pokémon
              image: details.sprites.front_default, // URL de l'image du Pokémon
              types: details.types.map((type) => type.type.name), // Types du Pokémon
            }))
          );
        });
        return forkJoin(results); // Exécution de toutes les requêtes en parallèle.
      })
    );
  }

  // Méthode publique pour obtenir les détails d'un Pokémon spécifique par son ID.
  public getPokemonDetails(id: number): Observable<PokemonDetails> {
    // Retourne un Observable après avoir effectué une requête GET à l'API.
    return this.http.get<PokemonDetails>(`${this.apiUrl}/pokemon/${id}`);
  }

  // Méthode privée pour extraire l'ID du Pokémon à partir de son URL.
  private getPokemonIdFromUrl(url: string): number {
    // Découpe l'URL et extrait l'ID.
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
