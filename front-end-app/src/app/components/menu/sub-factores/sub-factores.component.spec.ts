import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFactoresComponent } from './sub-factores.component';

describe('SubFactoresComponent', () => {
  let component: SubFactoresComponent;
  let fixture: ComponentFixture<SubFactoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFactoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
