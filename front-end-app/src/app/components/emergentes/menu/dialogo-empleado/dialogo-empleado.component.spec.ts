import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEmpleadoComponent } from './dialogo-empleado.component';

describe('DialogoEmpleadoComponent', () => {
  let component: DialogoEmpleadoComponent;
  let fixture: ComponentFixture<DialogoEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
