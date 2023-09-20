import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

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
export class SearchbarComponent implements OnInit {
  pokemonName!: string;
  pokemonInfo!: any;

  // Inject the pokemon service into the constructor
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }

  searchPokemon(pokemonName: string) {

    // If there is no pokemon name, get all pokemons
    if (!pokemonName) {
      this.pokemonInfo = this.pokemonService.getPokemons().subscribe(
        (data: any) => {
          this.pokemonInfo = data;
        }
      )
    }

    // Get the pokemon by name
    this.pokemonInfo = this.pokemonService.getPokemon(pokemonName).subscribe(
      (data: any) => {
        this.pokemonInfo = data;
      }
    )
  }
}
