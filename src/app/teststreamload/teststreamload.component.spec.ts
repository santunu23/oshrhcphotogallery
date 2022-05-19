import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeststreamloadComponent } from './teststreamload.component';

describe('TeststreamloadComponent', () => {
  let component: TeststreamloadComponent;
  let fixture: ComponentFixture<TeststreamloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeststreamloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeststreamloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
