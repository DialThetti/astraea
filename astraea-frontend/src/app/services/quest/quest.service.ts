import { Injectable } from '@angular/core';
import { Quest } from '../../models/quest.model';
import { Observable, filter, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  quests = [
    {
      type: 'collect',
      id: 'collect1',
      payload: {
        item: 'ironoak_log',
        count: 5,
      },
      prompt: 'quests.collect.1.prompt',
    },
    {
      type: 'kill',
      id: 'kill1',
      payload: {
        enemy: 'boar',
        count: 3,
      },
      prompt: 'quests.kill.1.prompt',
    },
  ];
  constructor() {}

  getQuestById(id: string): Observable<Quest> {
    return of(this.quests.find((q) => q.id === id)).pipe(
      filter((e) => e != undefined)
    ) as Observable<Quest>;
  }
}
