import { Component, Input } from '@angular/core';
import { Quest } from '../../../models/quest.model';
import { Store } from '@ngrx/store';
import { acceptQuest } from '../../../store/quest/quest.actions';

@Component({
  selector: 'app-quest-line',
  templateUrl: './quest-line.component.html',
  styleUrls: ['./quest-line.component.scss'],
})
export class QuestLineComponent {
  @Input()
  quest!: Quest;

  @Input()
  actions: ('accept' | 'abandon')[] = [];
  constructor(private store: Store) {}

  acceptQuest(id: string) {
    this.store.dispatch(acceptQuest({ id }));
  }
}
