import { Component, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';
import Pokemon from '../../models/Pokemon';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

/**
 * @class ContainerComponent
 * @description This component is responsible for the initial loding of the pokemon list and for the pagination
 * @property { boolean } loading - The loading state of the component
 * @property { boolean } loadingChange - The loading state of the component
 * @property { Observable<Pokemon[]> } pokemons - The list of pokemons
 * 
 * @example <app-container></app-container>
 * 
 * @method ngOnInit - This method is responsible for initializing the component
 * 
 */
export class ContainerComponent implements OnInit {
  @Input() loading: boolean;
  @Output() loadingChange: boolean;
  pokemons : Observable<Pokemon[]> = new Observable<Pokemon[]>();

  constructor(private pokemonService : PokemonService) {
    this.loading = true;
    this.loadingChange = false;
  }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.getPokemons();
    this.loading = false;
    this.loadingChange = true;
  }
}
