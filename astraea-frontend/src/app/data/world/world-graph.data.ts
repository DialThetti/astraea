import { WorldGraph } from '../../models/world/world-graph.model';

export const worldData: WorldGraph = {
  nodes: [
    { id: 'alethar1', type: 'town', position: { x: 12, y: 2 } },
    { id: 'alethar2', type: 'town', position: { x: 17, y: 4 } },
    { id: 'alethar3', type: 'town', position: { x: 12.6, y: 5.8 } },
    { id: 'alethar_gate', type: 'poi', position: { x: 14, y: 9 } },
    { id: 'alethar_w1', type: 'wilderness', position: { x: 13, y: 3 } },
  ],
  edges: [
    //Alethar roads
    { from: 'alethar1', to: 'alethar2', travelModifier: 1 },
    { from: 'alethar3', to: 'alethar2', travelModifier: 1 },
    { from: 'alethar1', to: 'alethar3', travelModifier: 1 },
    { from: 'alethar2', to: 'alethar_gate', travelModifier: 1 },
    { from: 'alethar3', to: 'alethar_gate', travelModifier: 1 },
    //Alethar inner paths
    { from: 'alethar1', to: 'alethar_w1', travelModifier: 1.2 },
  ],
};
