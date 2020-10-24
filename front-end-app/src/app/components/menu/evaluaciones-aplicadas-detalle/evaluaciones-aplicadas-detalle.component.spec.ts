import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesAplicadasDetalleComponent } from './evaluaciones-aplicadas-detalle.component';

describe('EvaluacionesAplicadasDetalleComponent', () => {
  let component: EvaluacionesAplicadasDetalleComponent;
  let fixture: ComponentFixture<EvaluacionesAplicadasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionesAplicadasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionesAplicadasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
