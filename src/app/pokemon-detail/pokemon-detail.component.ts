import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.pokemonService.getPokemonDetail(id).subscribe((data) => {
      this.pokemon = data;
    });
  }
}
