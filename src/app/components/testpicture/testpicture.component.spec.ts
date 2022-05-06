import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpictureComponent } from './testpicture.component';

describe('TestpictureComponent', () => {
  let component: TestpictureComponent;
  let fixture: ComponentFixture<TestpictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestpictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
