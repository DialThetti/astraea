import { createReducer, on } from '@ngrx/store';
import { WorldGraphNode } from '../../models/world/world-graph.model';
import { worldData } from '../../data/world/world-graph.data';
import { arriveAtDestinationAction, travelUpdateAction } from './world.actions';

export interface WorldState {
  currentPosition: WorldGraphNode;
  travel?: {
    started: number;
    distance: number;
    target: WorldGraphNode;
  };
}

export const initialState: WorldState = {
  currentPosition: worldData.nodes.find(
    (n) => n.id === 'alethar1'
  ) as WorldGraphNode,
};

export const worldReducer = createReducer(
  initialState,
  on(arriveAtDestinationAction, (state: WorldState, { target }) => ({
    ...state,
    currentPosition: target,
    travel: undefined,
  })),
  on(
    travelUpdateAction,
    (state: WorldState, { distance, target, started }) => ({
      ...state,
      travel: {
        distance,
        target,
        started,
      },
    })
  )
);
