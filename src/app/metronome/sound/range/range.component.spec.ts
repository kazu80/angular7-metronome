import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSoundComponent } from './range.component';

describe('RangeComponent', () => {
  let component: RangeSoundComponent;
  let fixture: ComponentFixture<RangeSoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
