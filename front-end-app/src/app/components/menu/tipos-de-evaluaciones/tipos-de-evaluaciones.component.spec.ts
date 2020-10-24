import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeEvaluacionesComponent } from './tipos-de-evaluaciones.component';

describe('TiposDeEvaluacionesComponent', () => {
  let component: TiposDeEvaluacionesComponent;
  let fixture: ComponentFixture<TiposDeEvaluacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposDeEvaluacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDeEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
