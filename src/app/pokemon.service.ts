import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = '/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList() {
    return this.http.get(`${this.apiUrl}/pokemon`);
  }

  getPokemonDetails(id: number) {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }
}
