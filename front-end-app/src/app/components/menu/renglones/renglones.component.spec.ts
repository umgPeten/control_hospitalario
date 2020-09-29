import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenglonesComponent } from './renglones.component';

describe('RenglonesComponent', () => {
  let component: RenglonesComponent;
  let fixture: ComponentFixture<RenglonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenglonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenglonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
