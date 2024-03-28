import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { acceptQuest } from '../../store/quest/quest.actions';
import { QuestState } from '../../store/quest/quest.reducer';
import {
  selectAcceptedQuests,
  selectAvailableQuests,
} from '../../store/quest/quest.selectors';
import { QuestService } from '../../services/quest/quest.service';
import { Observable } from 'rxjs';
import { Quest } from '../../models/quest.model';

@Component({
  selector: 'app-guild-page',
  templateUrl: './guild-page.component.html',
  styleUrls: ['./guild-page.component.scss'],
})
export class GuildPageComponent {
  accepted$ = this.store.select(selectAcceptedQuests);
  available$ = this.store.select(selectAvailableQuests);
  constructor(
    private store: Store<{ quests: QuestState }>,
    private questService: QuestService
  ) {}

  getQuest(id: string): Observable<Quest> {
    return this.questService.getQuestById(id);
  }
}
