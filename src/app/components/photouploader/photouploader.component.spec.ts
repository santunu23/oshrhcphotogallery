import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotouploaderComponent } from './photouploader.component';

describe('PhotouploaderComponent', () => {
  let component: PhotouploaderComponent;
  let fixture: ComponentFixture<PhotouploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotouploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotouploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
