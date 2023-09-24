import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';

import Pokemon from './models/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-pokedex';
  @Input()
  get pokemonsInfo(): Observable<Pokemon[]> | null {
    return this._searchedPokemonInfo;
  }
  set pokemonsInfo(pokemonList: Observable<Pokemon[]> | null) {
    this._searchedPokemonInfo = pokemonList;
    this.pokemons.emit(this._searchedPokemonInfo);
  }

  @Output()
  readonly pokemons = new EventEmitter<Observable<Pokemon[]> | null>();

  private _searchedPokemonInfo: Observable<Pokemon[]> | null = null;

  /**
   * Bind input from searchbar to pokemonsInfo.
   * Used to pass the pokemon list to the container component.
   * 
   * @param pokemonList Observable<Pokemon[]> | null
   * 
   * @returns void
   */
  onSearch(pokemonList: Observable<Pokemon[]> | null) : void  {
    this.pokemonsInfo = pokemonList;
  }
}
