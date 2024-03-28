import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentPosition } from '../../store/world/world.selectors';

@Component({
  selector: 'app-town-page',
  templateUrl: './town-page.component.html',
  styleUrls: ['./town-page.component.scss'],
})
export class TownPageComponent {
  currentPosition$ = this.store.select(selectCurrentPosition);
  constructor(private store: Store) {}
}
