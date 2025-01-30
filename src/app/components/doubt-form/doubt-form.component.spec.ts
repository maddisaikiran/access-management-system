import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubtFormComponent } from './doubt-form.component';

describe('DoubtFormComponent', () => {
  let component: DoubtFormComponent;
  let fixture: ComponentFixture<DoubtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubtFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
