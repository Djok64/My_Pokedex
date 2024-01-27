import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    console.log('Component initialized. Calling service...');
    this.pokemonService.getPokemons(10, 0).subscribe(
      (data) => {
        console.log('Data received from service:', data);
        this.pokemons = data.results;
      },
      (error) => {
        console.error('Failed to fetch data:', error);
      }
    );
  }
}
