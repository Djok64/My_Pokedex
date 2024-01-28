// Ce composant est le point de départ de votre application et sert généralement de conteneur pour les autres composants.

// Importation des modules nécessaires depuis le package Angular core et Angular router.
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Importe RouterOutlet pour la navigation entre les routes.
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NavbarComponent } from './navbar/navbar.component'; // Importe le composant PokemonListComponent.

// Décorateur Component pour définir les métadonnées du composant.
@Component({
  selector: 'app-root', // Le sélecteur CSS pour utiliser ce composant. <app-root></app-root> peut être utilisé dans le HTML.
  standalone: true, // Importe RouterOutlet dans le composant, ce qui permet d'afficher les composants de route.
  templateUrl: './app.component.html', // Chemin vers le fichier de template HTML pour ce composant.
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavbarComponent],
})
export class AppComponent {
  title = 'MyPokedex'; // Propriété du composant, utilisée pour stocker le titre de l'application.
}

// Le décorateur @Component est utilisé pour définir les métadonnées du composant, telles que le sélecteur, le chemin du template, et les styles. Dans ce cas, le composant est déclaré comme autonome (standalone: true), ce qui signifie qu'il n'a pas besoin d'être déclaré dans un module Angular. Le RouterOutlet est importé pour permettre la navigation entre les différentes routes de l'application.

// Le titre 'MyPokedex' est une propriété de la classe AppComponent et peut être utilisé dans le template HTML du composant pour afficher le titre de l'application.
