import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoNosotrosComponent } from './dialogo-nosotros.component';

describe('DialogoNosotrosComponent', () => {
  let component: DialogoNosotrosComponent;
  let fixture: ComponentFixture<DialogoNosotrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoNosotrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
