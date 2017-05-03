import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteItemAddComponent } from './vote-item-add.component';

describe('VoteItemAddComponent', () => {
  let component: VoteItemAddComponent;
  let fixture: ComponentFixture<VoteItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
