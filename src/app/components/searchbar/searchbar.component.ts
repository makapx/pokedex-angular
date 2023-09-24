import { Component, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import Pokemon from '../../models/Pokemon';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
/**
 * @class SearchbarComponent
 * @description This Outputcomponent is responsible for the searchbar
 * @property { string } pokemonName - The name of the pokemon to search for
 *
 * @method searchPokemon - This method is responsible for searching for the pokemon
 *
 * @example <app-searchbar></app-searchbar>
 *
 * @returns { void }
 */
export class SearchbarComponent {
  pokemonName!: string;

  @Output()
  readonly searchedPokemonInfo = new EventEmitter<Observable<
    Pokemon[]
  > | null>();

  // Inject the pokemon service into the constructor
  constructor(private pokemonService: PokemonService) {}

  /**
   * @method searchPokemon
   * @description This method is responsible for searching for the pokemon.
   * If the pokemonName is not empty, it will invoke the getPokemon method from the pokemon service.
   *
   * @param { string } pokemonName - The name of the pokemon to search for
   *
   * @returns { void }
   */
  searchPokemon(pokemonName: string): void {
    if (!pokemonName) {
      this.searchedPokemonInfo.emit(this.pokemonService.getPokemons());
      return;
    }

    this.searchedPokemonInfo.emit(
      this.pokemonService
        .getPokemon(pokemonName)
        .pipe(map((pokemon) => [pokemon]))
    );
  }
}
