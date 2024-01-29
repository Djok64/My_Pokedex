// Composant Angular qui sert à afficher les détails d'un Pokémon spécifique. Ce composant utilise PokemonService pour récupérer les détails d'un Pokémon basé sur l'ID récupéré de l'URL grâce à ActivatedRoute

// Importation des modules nécessaires.
import { Component, OnInit } from '@angular/core'; // Importe les éléments nécessaires pour créer un composant Angular et gérer son cycle de vie.
import { ActivatedRoute } from '@angular/router'; // Importe ActivatedRoute pour accéder aux paramètres de l'URL, ici pour obtenir l'ID du Pokémon.
import { PokemonService } from '../pokemon.service'; // Importe le service PokemonService pour récupérer les données des Pokémon.
import { CommonModule } from '@angular/common'; // Importe CommonModule, qui fournit des directives comme ngIf et ngFor.

import { Router, RouterLinkWithHref } from '@angular/router';

// Décorateur Component pour définir les métadonnées du composant.
@Component({
  selector: 'app-pokemon-detail', // Sélecteur CSS pour utiliser ce composant dans le HTML.
  standalone: true, // Indique que le composant est autonome et ne nécessite pas d'être déclaré dans un module Angular.
  imports: [CommonModule, RouterLinkWithHref], // Importe CommonModule pour utiliser ses fonctionnalités dans le template. et RouterLinkWithHref pour licone pokedex retour
  templateUrl: './pokemon-detail.component.html', // Chemin vers le fichier de template HTML du composant.
  styleUrls: ['./pokemon-detail.component.css'], // Chemin vers le fichier CSS pour les styles du composant.
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null; // Stocke les détails du Pokémon récupéré par le service.
  typesAsString: string = ''; // Stocke les types du Pokémon sous forme de chaîne de caractères.
  typeColorClass: string = ''; // Ajoutez cette propriété pour stocker la classe de couleur du type principal

  // Le constructeur pour injecter les dépendances dont le composant a besoin.
  constructor(
    private pokemonService: PokemonService, // Le service qui fournira les données des Pokémon.
    private route: ActivatedRoute // Pour accéder aux paramètres de l'URL, ici pour obtenir l'ID du Pokémon.
  ) {}

  // La méthode ngOnInit est un hook du cycle de vie qui est appelé après la création du composant.
  ngOnInit(): void {
    // Récupère l'ID du Pokémon à partir de l'URL.
    const id = this.route.snapshot.params['id'];

    // Utilise le service PokemonService pour obtenir les détails du Pokémon avec l'ID spécifié.
    this.pokemonService.getPokemonDetails(id).subscribe((data: any) => {
      this.pokemon = data; // Stocke les données dans la propriété pokemon du composant.
      // Transforme les types du Pokémon en une chaîne de caractères séparée par des virgules.
      this.typesAsString = data.types
        .map((t: { type: { name: any } }) => t.type.name)
        .join(', ');
      // Détermine la classe de couleur pour le nom du Pokémon en fonction du premier type.
      this.typeColorClass = this.getTypeClass(data.types);
    });
  }

  // Retourne une classe CSS basée sur les types du Pokémon.
  getTypeClass(types: any): string {
    if (types && types.length > 0) {
      if (types.length === 2) {
        // Si deux types sont présents, combine les deux pour former le nom de la classe.
        return `type-${types[0].type.name.toLowerCase()}_${types[1].type.name.toLowerCase()}`;
      }
      // Si un seul type est présent, utilise ce type pour former le nom de la classe.
      return `type-${types[0].type.name.toLowerCase()}`;
    }
    // Si aucun type n'est défini, retourne une chaîne vide pour éviter les erreurs.
    return '';
  }
}

// Ce composant est un exemple typique d'un composant Angular qui récupère des données à partir d'un service (PokemonService)
// et les affiche dans un template. La méthode ngOnInit est utilisée pour initialiser le composant,
// notamment en récupérant les données des Pokémon dès que le composant est créé.
