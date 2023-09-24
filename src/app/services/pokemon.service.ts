import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, switchMap } from 'rxjs';

import Pokemon from '../models/Pokemon';

const APIURL = 'https://pokeapi.co/api/v2/pokemon/';
const DEFAULTLIMIT = 20;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  /**
   * Get pokemon by name
   *
   * @param pokemonName pokemon name to search for
   * @returns { Observable<Pokemon> }
   */
  getPokemon(pokemonName: string): Observable<Pokemon> {
    const response = this.http.get<any>(`${APIURL}${pokemonName}`);
    return response.pipe(
      map((data: any) => {
        const { id, name, height, weight } = data;

        const types = data.types.map((t: any) => t.type.name);
        const abilities = data.abilities.map((a: any) => a.ability.name);

        const stats = data.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        }));

        return {
          id,
          name,
          sprite: data.sprites.front_default,
          animateSprite:
            data.sprites.versions['generation-v']['black-white'].animated
              .front_default,
          types,
          height,
          weight,
          abilities,
          stats,
          evolutions: [],
        };
      })
    ) as Observable<Pokemon>;
  }

  /**
   * Get all pokemons
   *
   * @returns { Observable<any> }
   *
   */
  getPokemons(): Observable<Pokemon[]> {
    //@TODO: Provide offset for pagination
    return this.http.get<any>(`${APIURL}?limit=${DEFAULTLIMIT}`).pipe(
      map((data: any) => data.results.map((p: any) => p.name)),
      switchMap((pokemonsNames: string[]) =>
        combineLatest(pokemonsNames.map((pName) => this.getPokemon(pName)))
      )
    ) as Observable<Pokemon[]>;
  }
}
