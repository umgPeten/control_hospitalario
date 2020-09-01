import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoModificarComponent } from './dialogo-modificar.component';

describe('DialogoModificarComponent', () => {
  let component: DialogoModificarComponent;
  let fixture: ComponentFixture<DialogoModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
