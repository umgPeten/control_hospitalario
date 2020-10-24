import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesDetalleComponent } from './evaluaciones-detalle.component';

describe('EvaluacionesDetalleComponent', () => {
  let component: EvaluacionesDetalleComponent;
  let fixture: ComponentFixture<EvaluacionesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
