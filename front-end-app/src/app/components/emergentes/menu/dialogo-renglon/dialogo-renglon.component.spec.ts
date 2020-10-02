import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoRenglonComponent } from './dialogo-renglon.component';

describe('DialogoRenglonComponent', () => {
  let component: DialogoRenglonComponent;
  let fixture: ComponentFixture<DialogoRenglonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoRenglonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoRenglonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
