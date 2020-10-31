import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoTiposDeEvaluacionComponent } from './dialogo-tipos-de-evaluacion.component';

describe('DialogoTiposDeEvaluacionComponent', () => {
  let component: DialogoTiposDeEvaluacionComponent;
  let fixture: ComponentFixture<DialogoTiposDeEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoTiposDeEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoTiposDeEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
