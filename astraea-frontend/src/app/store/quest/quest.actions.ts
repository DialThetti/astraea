import { createAction, props } from '@ngrx/store';

export const acceptQuest = createAction(
  '[QuestAction] accept quest',
  props<{ id: string }>()
);

export const completeQuest = createAction(
  '[QuestAction] complete quest',
  props<{ id: string }>()
);
