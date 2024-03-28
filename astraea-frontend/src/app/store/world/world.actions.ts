import { createAction, props } from '@ngrx/store';
import { WorldGraphNode } from '../../models/world/world-graph.model';

export const arriveAtDestinationAction = createAction(
  '[WorldAction] travel to',
  props<{ target: WorldGraphNode }>()
);

export const travelUpdateAction = createAction(
  '[WorldAction] traveling',
  props<{ distance: number; started: number; target: WorldGraphNode }>()
);
