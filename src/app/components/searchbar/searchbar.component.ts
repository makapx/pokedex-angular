import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import Pokemon from '../../models/Pokemon';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
/**
 * @class SearchbarComponent
 * @description This component is responsible for the searchbar
 * @property { string } pokemonName - The name of the pokemon to search for
 * 
 * @method ngOnInit - This method is responsible for initializing the component
 * @method searchPokemon - This method is responsible for searching for the pokemon
 * 
 * @example <app-searchbar></app-searchbar>
 * 
 * @returns { void } 
 */
export class SearchbarComponent {
  pokemonName!: string;
  pokemonInfo : Observable<Pokemon> = new Observable<Pokemon>();
  
  // Inject the pokemon service into the constructor
  constructor(private pokemonService: PokemonService) { }

  /**
   * @method searchPokemon
   * @description This method is responsible for searching for the pokemon.
   * If the pokemonName is not empty, it will return the pokemon with the given name.
   * 
   * @param { string } pokemonName - The name of the pokemon to search for
   * 
   * @returns { void }
   */
  searchPokemon(pokemonName: string) {
    if (pokemonName === '') return;
    this.pokemonInfo = this.pokemonService.getPokemon(pokemonName);
  }
}
