import { createReducer, on } from '@ngrx/store';
import { acceptQuest, completeQuest } from './quest.actions';

export interface QuestState {
  questlog: {
    accepted: string[];
    completed: string[];
    available: string[];
  };
}
export const initialState: QuestState = {
  questlog: {
    accepted: [],
    completed: [],
    available: ['kill1', 'collect1'],
  },
};

export const questReducer = createReducer(
  initialState,
  on(acceptQuest, (state, { id }) => ({
    ...state,
    questlog: {
      ...state.questlog,
      accepted: [...state.questlog.accepted, id],
      available: state.questlog.available.filter((q) => q !== id),
    },
  })),
  on(completeQuest, (state, { id }) => {
    if (state.questlog.accepted.includes(id)) {
      return {
        ...state,
        questlog: {
          ...state.questlog,
          accepted: state.questlog.accepted.filter((q) => q !== id),
          completed: [...state.questlog.completed, id],
        },
      };
    } else {
      console.warn('quest was not active');
      return state;
    }
  })
);
