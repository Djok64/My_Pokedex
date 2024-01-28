// Composant Angular qui sert à afficher une liste de Pokémon. Ce composant utilise le service PokemonService pour récupérer les données des Pokémon et les affiche ensuite.

// Importation des modules nécessaires.
import { Component, OnInit } from '@angular/core'; // Importe Component pour la déclaration du composant et OnInit pour le cycle de vie du composant.
import { PokemonService, Pokemon } from '../pokemon.service'; // Importe le service PokemonService pour récupérer les données des Pokémon.

import { CommonModule } from '@angular/common'; // Importe CommonModule pour les fonctionnalités de base d'Angular comme ngIf, ngFor, etc.

import { Router } from '@angular/router';

// Décorateur Component pour définir les métadonnées du composant.
@Component({
  selector: 'app-pokemon-list', // Sélecteur CSS pour utiliser ce composant.
  standalone: true, // Indique que le composant est autonome, ne nécessitant pas d'être déclaré dans un module.
  imports: [CommonModule], // Importe CommonModule pour utiliser les directives comme *ngFor dans le template.
  templateUrl: './pokemon-list.component.html', // Chemin vers le fichier de template HTML.
  styleUrls: ['./pokemon-list.component.css'], // Chemin vers le fichier de styles CSS.
})
export class PokemonListComponent implements OnInit {
  // Propriété pour stocker la liste des Pokémon.
  pokemonList: Pokemon[] = [];

  // Injection du service PokemonService dans le constructeur.
  constructor(private pokemonService: PokemonService, private router: Router) {}

  // Méthode ngOnInit du cycle de vie du composant, appelée après la création du composant.
  ngOnInit(): void {
    // Appel de la méthode getAllPokemonDetails du service PokemonService pour charger les Pokémon.
    this.pokemonService.getAllPokemonDetails().subscribe((data: Pokemon[]) => {
      console.log('Données Pokémon complètes :', data); // Affichage des données dans la console.

      // Vérification si les données reçues sont un tableau.
      if (Array.isArray(data)) {
        this.pokemonList = data; // Stockage des données dans la propriété pokemonList.
      } else {
        console.error('Données Pokémon non valides.'); // Affichage d'une erreur si les données ne sont pas un tableau.
      }
    });
  }
  // Méthode pour gérer le clic sur une carte Pokémon.
  goToPokemonDetails(pokemonId: number): void {
    console.log(pokemonId); // Ajoutez cette ligne pour déboguer
    if (pokemonId) {
      // Navigation vers la page de détails du Pokémon.
      this.router.navigate(['/pokemon', pokemonId]);
    } else {
      console.error('ID du Pokémon est undefined');
    }
  }
}
//Ce composant est un exemple typique d'un composant Angular qui récupère des données à partir d'un service (PokemonService) et les affiche dans un template. La méthode ngOnInit est utilisée pour initialiser le composant, notamment en récupérant les données des Pokémon dès que le composant est créé.
