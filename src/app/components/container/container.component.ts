import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';
import Pokemon from '../../models/Pokemon';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * @class ContainerComponent
 * @description This component is responsible for the initial loding of the pokemon list and for the pagination
 * @property { Observable<Pokemon[]> } pokemons - The list of pokemons
 *
 * @example <app-container></app-container>
 *
 *
 */
export class ContainerComponent implements OnInit {
  @Input()
  get pokemonsInfo(): Observable<Pokemon[]> | null {
    return this._pokemonsInfo;
  }

  set pokemonsInfo(pokemonList: Observable<Pokemon[]> | null) {
    this._pokemonsInfo = pokemonList;
    this.pokemons.emit(this._pokemonsInfo);
  }

  @Output()
  readonly pokemons = new EventEmitter<Observable<Pokemon[]> | null>();

  private _pokemonsInfo: Observable<Pokemon[]> | null = null;

  constructor(private pokemonService: PokemonService) {}

  /**
   * Get all pokemons from the pokemon service on init.
   *
   * @returns void
   */
  ngOnInit() {
    this.pokemonsInfo = this.pokemonService.getPokemons();
  }
}
