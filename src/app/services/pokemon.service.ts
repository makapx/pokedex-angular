import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import {Observable, combineLatest, map, switchMap } from 'rxjs';

import Pokemon from '../models/Pokemon';

const APIURL = 'https://pokeapi.co/api/v2/pokemon/';
const DEFAULTLIMIT = 20;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  /**
   * Get pokemon by name
   * 
   * @param pokemonName pokemon name to search for
   * @returns { Observable<Pokemon> }
   */
  getPokemon(pokemonName: string) : Observable<Pokemon> {
    const response = this.http.get<any>(`${APIURL}${pokemonName}`);
    return response.pipe( map((data: any) => {
      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        animateSprite: data.sprites.versions['generation-v']['black-white'].animated.front_default,
        types: data.types.map((type: any) => type.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((ability: any) => ability.ability.name),
        stats: data.stats.map((stat: any) => {
          return {
            name: stat.stat.name,
            value: stat.base_stat
          }
        }),
        evolutions: []
      }
    }
    )) as Observable<Pokemon>;
  }

  /**
   * Get all pokemons
   * 
   * @returns { Observable<any> }
   * 
   */
  getPokemons() : Observable<Pokemon[]> {
    //@TODO: Provide offset for pagination
    const response = this.http.get<any>(`${APIURL}?limit=${DEFAULTLIMIT}`);
    return response.pipe(
      map((data: any) => {
        return data.results.map((pokemon: any) => {
          return pokemon.name;
        });
      }),
      switchMap((pokemons: string[]) => {
        const completePokemonData : Observable<Pokemon>[] = []; 
        pokemons.forEach((pokemon: string) => {
          completePokemonData.push(this.getPokemon(pokemon));
        });
        return combineLatest(completePokemonData);
      }),
    ) as Observable<Pokemon[]>;
  }
}
