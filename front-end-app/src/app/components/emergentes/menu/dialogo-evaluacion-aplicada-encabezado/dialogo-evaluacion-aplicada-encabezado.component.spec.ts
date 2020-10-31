import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEvaluacionAplicadaEncabezadoComponent } from './dialogo-evaluacion-aplicada-encabezado.component';

describe('DialogoEvaluacionAplicadaEncabezadoComponent', () => {
  let component: DialogoEvaluacionAplicadaEncabezadoComponent;
  let fixture: ComponentFixture<DialogoEvaluacionAplicadaEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEvaluacionAplicadaEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEvaluacionAplicadaEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
