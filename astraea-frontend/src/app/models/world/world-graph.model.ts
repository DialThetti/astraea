import { Point } from '../point.model';

export interface WorldGraph {
  nodes: WorldGraphNode[];
  edges: WorldGraphEdge[];
}

export interface WorldGraphEdge {
  from: string;
  to: string;
  travelModifier: number;
}

export interface WorldGraphNode {
  id: string;
  position: Point;
  type: 'town' | 'wilderness' | 'dungeon' | 'village' | 'poi';
}
