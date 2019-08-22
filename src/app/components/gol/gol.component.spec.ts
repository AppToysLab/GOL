import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GOLComponent } from './gol.component';

describe('GOLComponent', () => {
  let component: GOLComponent;
  let fixture: ComponentFixture<GOLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GOLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GOLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
