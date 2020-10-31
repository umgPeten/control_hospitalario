import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEvaluacionAplicadaDetalleComponent } from './dialogo-evaluacion-aplicada-detalle.component';

describe('DialogoEvaluacionAplicadaDetalleComponent', () => {
  let component: DialogoEvaluacionAplicadaDetalleComponent;
  let fixture: ComponentFixture<DialogoEvaluacionAplicadaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEvaluacionAplicadaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEvaluacionAplicadaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
