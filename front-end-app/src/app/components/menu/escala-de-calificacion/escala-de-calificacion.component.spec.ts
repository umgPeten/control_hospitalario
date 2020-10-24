import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaDeCalificacionComponent } from './escala-de-calificacion.component';

describe('EscalaDeCalificacionComponent', () => {
  let component: EscalaDeCalificacionComponent;
  let fixture: ComponentFixture<EscalaDeCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaDeCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaDeCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
