import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesEncabezadoComponent } from './evaluaciones-encabezado.component';

describe('EvaluacionesEncabezadoComponent', () => {
  let component: EvaluacionesEncabezadoComponent;
  let fixture: ComponentFixture<EvaluacionesEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionesEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionesEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
