import { Component, HostListener } from '@angular/core';
import { worldData } from '../../data/world/world-graph.data';
import { WorldGraphNode } from '../../models/world/world-graph.model';
import { Timer } from '../../util/timer';
import { Store } from '@ngrx/store';
import {
  selectCurrentPosition,
  selectTraveling,
} from '../../store/world/world.selectors';
import {
  arriveAtDestinationAction,
  travelUpdateAction,
} from '../../store/world/world.actions';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-travel-page',
  templateUrl: './travel-page.component.html',
  styleUrls: ['./travel-page.component.scss'],
})
export class TravelPageComponent {
  mapOffset = { x: 400, y: 650 };
  currentWorldPosition$ = this.store.select(selectCurrentPosition);
  traveling$ = this.store.select(selectTraveling);

  remaining?: number;
  targets$: Observable<(WorldGraphNode & { travelTime: number })[]>;

  constructor(private store: Store) {
    this.targets$ = this.currentWorldPosition$.pipe(
      tap(
        (cp) =>
          (this.mapOffset = {
            x: cp.position.x * (1600 / 30) - 400,
            y: (22 - cp.position.y) * (1200 / 22) - 300,
          })
      ),
      map((target) => this.getPossibleTargets(target.id))
    );
    this.traveling$.pipe(filter((e) => !!e)).subscribe((e: any) => {
      const dT = Date.now() - (e?.started ?? Date.now());
      this.remaining = (e.distance ?? 99999999) * 60 * 1000 - dT;
      const i = setInterval(() => {
        const dT = Date.now() - (e?.started ?? Date.now());
        this.remaining = (e.distance ?? 99999999) * 60 * 1000 - dT;
        if (this.remaining <= 0) {
          this.store.dispatch(arriveAtDestinationAction({ target: e?.target }));
          delete this.remaining;
          clearInterval(i);
        }
      }, 1000);
    });
  }

  getPossibleTargets(
    currentPosition: string
  ): (WorldGraphNode & { travelTime: number })[] {
    return [
      ...worldData.edges
        .filter((e) => e.from === currentPosition)
        .map((edge) => ({ target: edge.to, edge })),
      ...worldData.edges
        .filter((e) => e.to === currentPosition)
        .map((edge) => ({ target: edge.from, edge })),
    ]
      .map(({ target, edge }) => ({
        node: this.getWorldNodeByID(target),
        edge,
      }))
      .map(({ edge, node }) => ({
        ...node,
        travelTime:
          this.distance(this.getWorldNodeByID(currentPosition), node) *
          edge.travelModifier,
      }));
  }

  travelTo(target: WorldGraphNode & { travelTime: number }) {
    this.store.dispatch(
      travelUpdateAction({
        target,
        started: Date.now(),
        distance: target.travelTime,
      })
    );
    this.remaining = target.travelTime * 60 * 1000;
  }

  private distance(a: WorldGraphNode, b: WorldGraphNode) {
    return Math.sqrt(
      Math.pow(a.position.x - b.position.x, 2) +
        Math.pow(a.position.y - b.position.y, 2)
    );
  }
  private getWorldNodeByID(id: string): WorldGraphNode {
    return worldData.nodes.find((n) => n.id === id) as WorldGraphNode;
  }
}
