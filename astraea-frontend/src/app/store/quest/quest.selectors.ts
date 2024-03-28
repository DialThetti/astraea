import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestState } from './quest.reducer';

export const selectFeature = createFeatureSelector<QuestState>('quests');

export const selectAcceptedQuests = createSelector(
  selectFeature,
  (state: QuestState) => state.questlog.accepted
);

export const selectAvailableQuests = createSelector(
  selectFeature,
  (state) => state.questlog.available
);
