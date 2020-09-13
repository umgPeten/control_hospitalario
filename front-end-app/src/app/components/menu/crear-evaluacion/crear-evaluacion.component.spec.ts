import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEvaluacionComponent } from './crear-evaluacion.component';

describe('CrearEvaluacionComponent', () => {
  let component: CrearEvaluacionComponent;
  let fixture: ComponentFixture<CrearEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
