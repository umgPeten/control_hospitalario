import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoServicioComponent } from './dialogo-servicio.component';

describe('DialogoServicioComponent', () => {
  let component: DialogoServicioComponent;
  let fixture: ComponentFixture<DialogoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
