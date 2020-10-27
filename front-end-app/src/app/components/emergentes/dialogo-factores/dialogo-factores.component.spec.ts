import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoFactoresComponent } from './dialogo-factores.component';

describe('DialogoFactoresComponent', () => {
  let component: DialogoFactoresComponent;
  let fixture: ComponentFixture<DialogoFactoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoFactoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoFactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
