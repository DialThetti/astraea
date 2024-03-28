import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestLineComponent } from './quest-line.component';

describe('QuestLineComponent', () => {
  let component: QuestLineComponent;
  let fixture: ComponentFixture<QuestLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestLineComponent]
    });
    fixture = TestBed.createComponent(QuestLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
