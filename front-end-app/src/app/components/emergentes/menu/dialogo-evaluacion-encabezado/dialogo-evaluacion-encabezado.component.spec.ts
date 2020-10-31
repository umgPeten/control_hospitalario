import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEvaluacionEncabezadoComponent } from './dialogo-evaluacion-encabezado.component';

describe('DialogoEvaluacionEncabezadoComponent', () => {
  let component: DialogoEvaluacionEncabezadoComponent;
  let fixture: ComponentFixture<DialogoEvaluacionEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEvaluacionEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEvaluacionEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
