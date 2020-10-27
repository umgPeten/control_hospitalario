import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoSubFactoresComponent } from './dialogo-sub-factores.component';

describe('DialogoSubFactoresComponent', () => {
  let component: DialogoSubFactoresComponent;
  let fixture: ComponentFixture<DialogoSubFactoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoSubFactoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoSubFactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
