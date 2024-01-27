// Importation des modules nécessaires depuis le package Angular core et HttpClient pour les requêtes HTTP.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importation des opérateurs RxJS pour la manipulation des observables.
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

// Définition de l'interface Pokemon pour typer les données de Pokémon.
interface Pokemon {
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
    // Utilisation de getPokemonList pour obtenir la liste des Pokémon.
    return this.getPokemonList().pipe(
      // Utilisation de switchMap pour transformer les données reçues.
      switchMap((pokemonListData) => {
        // Création d'un tableau de requêtes pour obtenir les détails de chaque Pokémon.
        const results = pokemonListData.results.map((pokemon) =>
          this.getPokemonDetails(this.getPokemonIdFromUrl(pokemon.url))
        );
        // Utilisation de forkJoin pour attendre que toutes les requêtes soient terminées.
        return forkJoin(results);
      }),
      // Utilisation de map pour transformer les données reçues en un tableau de Pokémon.
      map((pokemonData: PokemonDetails[]) => {
        // Transformation des données en un format plus utilisable.
        return pokemonData.map((data) => ({
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((type) => type.type.name),
        }));
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
