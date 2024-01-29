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
  pokemonList: Pokemon[] = []; // Propriété pour stocker la liste des Pokémon.
  currentPage: number = 1; // Page actuelle
  pageSize: number = 10; // Nombre de Pokémon par page
  paginatedPokemon: Pokemon[] = []; // Tableau pour stocker les Pokémon à afficher sur la page courante.
  totalPages: number = 1; // Nombre total de pages de Pokémon.
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
        this.paginatePokemonList(); // Ajout pour paginer dès le début.
      } else {
        console.error('Données Pokémon non valides.'); // Affichage d'une erreur si les données ne sont pas un tableau.
      }
    });
  }

  // Méthode pour paginer la liste des Pokémon en fonction de la page actuelle.
  paginatePokemonList(): void {
    // Calcul du début et de la fin de la plage de Pokémon à afficher.
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Utilisation de la méthode slice() pour extraire la sous-liste de Pokémon paginée.
    this.paginatedPokemon = this.pokemonList.slice(startIndex, endIndex);

    // Calcul du nombre total de pages en utilisant la longueur totale de la liste de Pokémon et la taille de la page.
    this.totalPages = Math.ceil(this.pokemonList.length / this.pageSize);
  }

  // Méthode pour gérer le bouton "Précédent" et mettre à jour la liste paginée.
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--; // Décrémente le numéro de page actuel s'il n'est pas déjà à la première page.
      this.paginatePokemonList(); // Appelle la méthode pour mettre à jour la liste paginée.
    }
  }

  // Méthode pour gérer le bouton "Suivant" et mettre à jour la liste paginée.
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Incrémente le numéro de page actuel s'il n'est pas déjà à la dernière page.
      this.paginatePokemonList(); // Appelle la méthode pour mettre à jour la liste paginée.
    }
  }
  getTypeClass(types: string[] | string) {
    // Vérifie si le Pokémon a deux types
    if (Array.isArray(types) && types.length === 2) {
      return `type-${types[0].toLowerCase()}_${types[1].toLowerCase()}`;
    }
    // Sinon, retourne le class pour un seul type.
    return `type-${
      Array.isArray(types) ? types[0].toLowerCase() : types.toLowerCase()
    }`;
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
