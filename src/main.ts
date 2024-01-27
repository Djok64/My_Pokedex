// Importation des fonctions nécessaires depuis les packages Angular.
import { bootstrapApplication } from '@angular/platform-browser'; // Importe bootstrapApplication pour démarrer l'application.
import { appConfig } from './app/app.config'; // Importe appConfig pour la configuration de l'application.
import { AppComponent } from './app/app.component'; // Importe AppComponent, le composant racine de l'application.
import { PokemonService } from './app/pokemon.service'; // Importe PokemonService, le service pour gérer les données des Pokémon.

// Démarrage de l'application Angular.
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
); // Gestion des erreurs lors du démarrage de l'application.

//bootstrapApplication est utilisé pour démarrer l'application Angular. Cette fonction prend en charge l'initialisation de l'environnement d'exécution d'Angular et la configuration de l'application.

// AppComponent est le composant racine de votre application Angular. C'est le premier composant qui sera chargé et affiché dans votre application.

// appConfig contient la configuration de votre application, y compris les services et autres dépendances nécessaires.

// PokemonService est importé mais pas directement utilisé dans ce fichier. Il est probablement utilisé dans d'autres parties de votre application.

// Cette approche de démarrage de l'application est plus récente et diffère de l'approche traditionnelle utilisant un module racine (AppModule). Elle offre une manière plus flexible et potentiellement plus optimisée de démarrer des applications Angular.
