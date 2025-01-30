import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

const SAMPLE_TEXT= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin enim quam, semper et sodales in, aliquam vitae leo. Suspendisse quis eleifend nisl. Nunc ante ligula, ultricies sed quam et, consectetur laoreet enim. Praesent scelerisque velit efficitur blandit dapibus. Etiam vulputate, lacus eu vestibulum faucibus, leo odio consectetur sem, nec rhoncus nulla diam vitae ante. Aenean lacinia porta quam, vel pretium mi. Cras sed leo ut dui gravida faucibus ut at nibh. In hac habitasse platea dictumst. Praesent finibus tempor lobortis. Integer ut urna lacus. Fusce imperdiet dolor efficitur erat facilisis venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam non eros efficitur, accumsan est vel, pulvinar sem.";

@Component({
  selector: 'app-create-course-step-1',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-course-step-1.component.html',
  styleUrl: './create-course-step-1.component.css'
})

export class CreateCourseStep1Component implements OnInit {

  constructor(private act: ActivatedRoute) {

  }

  editId: any;
  form: FormGroup = new FormGroup({
        description: new FormControl("", [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60)
        ]),
        iconUrl: new FormControl('', Validators.required),
        longDescription: new FormControl('', [Validators.required, Validators.minLength(3)])
      });

  get courseTitle() {
      return this.form.controls['description'];
    }   

      ngOnInit(): void {
        this.editId = this.act.snapshot.paramMap.get('id') as string;
        if(this.editId != '' && this.editId != null) {
          this.form.setValue({
            description: history.state.course.description,
            iconUrl: history.state.course.iconUrl,
            longDescription: history.state.course.longDescription
          });
        }
}
}
