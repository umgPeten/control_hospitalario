import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEscalaDeCalificacionComponent } from './dialogo-escala-de-calificacion.component';

describe('DialogoEscalaDeCalificacionComponent', () => {
  let component: DialogoEscalaDeCalificacionComponent;
  let fixture: ComponentFixture<DialogoEscalaDeCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEscalaDeCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEscalaDeCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
