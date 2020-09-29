import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosMenuComponent } from './permisos-menu.component';

describe('PermisosMenuComponent', () => {
  let component: PermisosMenuComponent;
  let fixture: ComponentFixture<PermisosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
