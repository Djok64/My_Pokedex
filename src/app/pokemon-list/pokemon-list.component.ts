import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule, // Importez CommonModule pour les directives structurelles
    HttpClientModule, // Importez HttpClientModule si vous effectuez des appels HTTP directement depuis le composant
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  template: `<div *ngFor="let pokemon of pokemons">{{ pokemon.name }}</div>`,
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe((data: any) => {
      this.pokemonList = data.results;
    });
  }
}
