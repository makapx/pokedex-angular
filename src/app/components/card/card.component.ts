import { Component, Input } from '@angular/core';
import Pokemon from '../../models/Pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pokemon: Pokemon|null = null;
}
