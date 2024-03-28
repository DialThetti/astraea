import { QuestState } from './quest/quest.reducer';
import { WorldState } from './world/world.reducer';

export interface RootState {
  quests: QuestState;
  world: WorldState;
}
