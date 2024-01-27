// Composant Angular qui sert à afficher les détails d'un Pokémon spécifique. Ce composant utilise PokemonService pour récupérer les détails d'un Pokémon basé sur l'ID récupéré de l'URL grâce à ActivatedRoute

// Importation des modules nécessaires.
import { Component, OnInit } from '@angular/core'; // Importe Component pour la déclaration du composant et OnInit pour le cycle de vie du composant.
import { ActivatedRoute } from '@angular/router'; // Importe ActivatedRoute pour accéder aux paramètres de l'URL.
import { PokemonService } from '../pokemon.service'; // Importe le service PokemonService pour récupérer les données des Pokémon.
import { CommonModule } from '@angular/common'; // Importe CommonModule pour les fonctionnalités de base d'Angular.

// Décorateur Component pour définir les métadonnées du composant.
@Component({
  selector: 'app-pokemon-detail', // Sélecteur CSS pour utiliser ce composant.
  standalone: true, // Indique que le composant est autonome, ne nécessitant pas d'être déclaré dans un module.
  imports: [CommonModule], // Importe CommonModule pour utiliser les directives comme *ngFor dans le template.
  templateUrl: './pokemon-detail.component.html', // Chemin vers le fichier de template HTML.
  styleUrls: ['./pokemon-detail.component.css'], // Chemin vers le fichier de styles CSS.
})
export class PokemonDetailComponent implements OnInit {
  // Propriété pour stocker les détails du Pokémon.
  pokemon: any = null;

  // Injection du service PokemonService et ActivatedRoute dans le constructeur.
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  // Méthode ngOnInit du cycle de vie du composant, appelée après la création du composant.
  ngOnInit(): void {
    // Récupération de l'ID du Pokémon à partir des paramètres de l'URL.
    const id = this.route.snapshot.params['id'];

    // Appel de la méthode getPokemonDetails du service PokemonService avec l'ID récupéré.
    this.pokemonService.getPokemonDetails(id).subscribe((data: any) => {
      this.pokemon = data; // Stockage des détails du Pokémon dans la propriété pokemon.
    });
  }
}

//Ce composant récupère l'ID du Pokémon à partir de l'URL (via ActivatedRoute) et utilise cet ID pour demander les détails du Pokémon au service PokemonService. Les détails récupérés sont ensuite stockés dans la propriété pokemon du composant, qui peut être utilisée dans le template HTML pour afficher ces détails.
