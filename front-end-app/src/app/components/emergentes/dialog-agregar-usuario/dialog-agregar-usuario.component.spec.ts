import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarUsuarioComponent } from './dialog-agregar-usuario.component';

describe('DialogAgregarUsuarioComponent', () => {
  let component: DialogAgregarUsuarioComponent;
  let fixture: ComponentFixture<DialogAgregarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAgregarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgregarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
