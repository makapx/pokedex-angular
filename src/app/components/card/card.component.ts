import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import Pokemon from '../../models/Pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() pokemon: Pokemon|null = null;
}
