// Importation des modules et composants nécessaires.
import { ApplicationConfig } from '@angular/core'; // Importe ApplicationConfig pour la configuration de l'application.
import { provideHttpClient } from '@angular/common/http'; // Importe provideHttpClient pour la configuration du service HttpClient.
import { provideRouter } from '@angular/router'; // Importe provideRouter pour la configuration du routeur.
import { routes } from './app.routes'; // Importe les routes définies dans app.routes.ts.
import { CommonModule } from '@angular/common'; // Importe CommonModule, souvent utilisé pour les fonctionnalités communes comme les directives ngIf, ngFor, etc.
import { PokemonListComponent } from './pokemon-list/pokemon-list.component'; // Importe le composant PokemonListComponent.
import { NavbarComponent } from './navbar/navbar.component'; //importe la navbar pour naviguer sur le site
// Définition de la configuration de l'application.
export const appConfig: ApplicationConfig = {
  // Fournit un tableau de providers (fournisseurs de services et configurations).
  providers: [
    provideHttpClient(),
    provideRouter(routes), // Configure le routeur avec les routes définies dans app.routes.ts.

    // Configure le service HttpClient pour les requêtes HTTP.
  ],
};

// Ce fichier configure les services essentiels de votre application Angular, tels que le routeur et le client HTTP. La configuration est définie dans un objet ApplicationConfig et exportée sous le nom appConfig. Cette configuration peut ensuite être utilisée lors de l'initialisation de votre application Angular pour s'assurer que ces services sont correctement fournis et configurés.
