import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesAplicadasEncabezadoComponent } from './evaluaciones-aplicadas-encabezado.component';

describe('EvaluacionesAplicadasEncabezadoComponent', () => {
  let component: EvaluacionesAplicadasEncabezadoComponent;
  let fixture: ComponentFixture<EvaluacionesAplicadasEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionesAplicadasEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionesAplicadasEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
