import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteItemViewComponent } from './vote-item-view.component';

describe('VoteItemViewComponent', () => {
  let component: VoteItemViewComponent;
  let fixture: ComponentFixture<VoteItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
