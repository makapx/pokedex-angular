import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import {Observable} from 'rxjs';

const APIURL = 'https://pokeapi.co/api/v2/pokemon/';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  /**
   * Get pokemon by name
   * 
   * @param pokemonName pokemon name to search for
   * @returns { Observable<any> }
   */
  getPokemon(pokemonName: string) : Observable<any> {
    return this.http.get(`${APIURL}${pokemonName}`)
  }

  /**
   * Get all pokemons
   * 
   * @returns { Observable<any> }
   * 
   */
  getPokemons() : Observable<any> {
    return this.http.get(`${APIURL}`)
  }
}
