import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorldState } from './world.reducer';

export const selectWorldFeature = createFeatureSelector<WorldState>('world');

export const selectCurrentPosition = createSelector(
  selectWorldFeature,
  (state: WorldState) => state.currentPosition
);

export const selectTraveling = createSelector(
  selectWorldFeature,
  (state: WorldState) => state.travel
);
