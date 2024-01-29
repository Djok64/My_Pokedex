// Importation du module Routes d'Angular Router pour définir les routes de l'application.
import { Routes } from '@angular/router';

// Importation des composants utilisés dans les routes.
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
// Définition des routes de l'application.
export const routes: Routes = [
  // Route pour la racine ('/'). Lorsque l'utilisateur visite la racine, PokemonListComponent est affiché.
  { path: '', component: PokemonListComponent },

  // Route pour les détails d'un Pokémon spécifique.
  // ':id' est un paramètre dynamique dans l'URL. Par exemple, '/pokemon/1' affichera les détails du Pokémon avec l'ID 1.
  // PokemonDetailComponent est affiché lorsque cette route est visitée.
  // 'pathMatch: 'full'' assure que cette route correspond exactement à l'URL spécifiée.
  { path: 'pokemon/:id', component: PokemonDetailComponent, pathMatch: 'full' },
];

// Chaque route est définie comme un objet dans le tableau routes, avec les propriétés path et component. path définit le chemin de l'URL, et component indique quel composant Angular doit être chargé lorsque cette route est activée.

// Si vous avez d'autres fichiers ou des questions supplémentaires, n'hésitez pas à les partager.
