import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEvaluacionDetalleComponent } from './dialogo-evaluacion-detalle.component';

describe('DialogoEvaluacionDetalleComponent', () => {
  let component: DialogoEvaluacionDetalleComponent;
  let fixture: ComponentFixture<DialogoEvaluacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEvaluacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEvaluacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
