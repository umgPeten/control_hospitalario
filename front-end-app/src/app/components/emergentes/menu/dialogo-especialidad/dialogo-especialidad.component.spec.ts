import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEspecialidadComponent } from './dialogo-especialidad.component';

describe('DialogoEspecialidadComponent', () => {
  let component: DialogoEspecialidadComponent;
  let fixture: ComponentFixture<DialogoEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
