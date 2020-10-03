import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPuestoComponent } from './dialogo-puesto.component';

describe('DialogoPuestoComponent', () => {
  let component: DialogoPuestoComponent;
  let fixture: ComponentFixture<DialogoPuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
