import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseStep1Component } from './create-course-step-1.component';

describe('CreateCourseStep1Component', () => {
  let component: CreateCourseStep1Component;
  let fixture: ComponentFixture<CreateCourseStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCourseStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
