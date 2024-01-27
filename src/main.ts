import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { PokemonService } from './app/pokemon.service'; // Importez le service PokemonService

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
