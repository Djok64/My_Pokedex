// Composant Angular qui sert à afficher les détails d'un Pokémon spécifique. Ce composant utilise PokemonService pour récupérer les détails d'un Pokémon basé sur l'ID récupéré de l'URL grâce à ActivatedRoute

// Importation des modules nécessaires.
import { Component, OnInit } from '@angular/core'; // Importe les éléments nécessaires pour créer un composant Angular et gérer son cycle de vie.
import { ActivatedRoute } from '@angular/router'; // Importe ActivatedRoute pour accéder aux paramètres de l'URL, ici pour obtenir l'ID du Pokémon.
import { PokemonService } from '../pokemon.service'; // Importe le service PokemonService pour récupérer les données des Pokémon.
import { CommonModule } from '@angular/common'; // Importe CommonModule, qui fournit des directives comme ngIf et ngFor.

// Décorateur Component pour définir les métadonnées du composant.
@Component({
  selector: 'app-pokemon-detail', // Sélecteur CSS pour utiliser ce composant dans le HTML.
  standalone: true, // Indique que le composant est autonome et ne nécessite pas d'être déclaré dans un module Angular.
  imports: [CommonModule], // Importe CommonModule pour utiliser ses fonctionnalités dans le template.
  templateUrl: './pokemon-detail.component.html', // Chemin vers le fichier de template HTML du composant.
  styleUrls: ['./pokemon-detail.component.css'], // Chemin vers le fichier CSS pour les styles du composant.
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null; // Propriété pour stocker les détails du Pokémon récupérés.

  // Constructeur pour injecter les dépendances.
  constructor(
    private pokemonService: PokemonService, // Injecte le service PokemonService.
    private route: ActivatedRoute // Injecte ActivatedRoute pour accéder aux paramètres de l'URL.
  ) {}

  // Méthode ngOnInit appelée après la création du composant.
  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Récupère l'ID du Pokémon à partir de l'URL.

    // Appelle le service PokemonService pour obtenir les détails du Pokémon.
    this.pokemonService.getPokemonDetails(id).subscribe((data: any) => {
      this.pokemon = data; // Stocke les détails du Pokémon dans la propriété pokemon.
    });
  }
}

//Ce composant récupère l'ID du Pokémon à partir de l'URL (via ActivatedRoute) et utilise cet ID pour demander les détails du Pokémon au service PokemonService. Les détails récupérés sont ensuite stockés dans la propriété pokemon du composant, qui peut être utilisée dans le template HTML pour afficher ces détails.
