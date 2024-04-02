import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Point } from '../../../models/point.model';
import { WorldGraphNode } from '../../../models/world/world-graph.model';
import { Store } from '@ngrx/store';
import { selectCurrentPosition } from '../../../store/world/world.selectors';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input()
  targets: (WorldGraphNode & { travelTime: number })[] = [];
  @Input()
  mapOffset!: Point;

  @Input()
  disabled: boolean = false;
  @Output()
  travelTo = new EventEmitter<WorldGraphNode & { travelTime: number }>();
  private mouseDown: boolean = false;

  private last!: MouseEvent;

  currentWorldPosition$ = this.store.select(selectCurrentPosition);
  constructor(private store: Store) {}
  @HostListener('mouseup')
  onMouseup() {
    this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.mouseDown) {
      this.mapOffset.x -= event.clientX - this.last.clientX;
      this.mapOffset.y -= event.clientY - this.last.clientY;

      this.last = event;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: any) {
    this.mouseDown = true;
    this.last = event;
  }

  onTravelTo(node: WorldGraphNode & { travelTime: number }) {
    this.travelTo.emit(node);
  }
}
