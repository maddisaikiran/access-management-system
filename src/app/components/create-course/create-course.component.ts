import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CreateCourseStep1Component } from '../create-course-step-1/create-course-step-1.component';
import { CreateCourseStep2Component } from "../create-course-step-2/create-course-step-2.component";
import { Topic } from '../../model/interface/Topic';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-course',
  imports: [MaterialModule, CreateCourseStep1Component, CreateCourseStep2Component],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit{

  editId: any;
  empId: string = '';
  courseId!: string;
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private act: ActivatedRoute ){}

  ngOnInit() {
this.editId = this.act.snapshot.paramMap.get('id') as string;
const userString = localStorage.getItem('userObject') ?? '';
    let user: { id: string } = {
      id: ''
    };
if (userString) {
    user = JSON.parse(userString);
    this.empId = user.id;
}
  }

  @ViewChild(CreateCourseStep1Component)
  step1Component!: CreateCourseStep1Component;

  topics: Topic[] = [];

  onTopicsUpdated(updatedTopics: Topic[]) {
    this.topics = updatedTopics;
  }

  addCourse() {
    if(this.step1Component.form.valid) {
      if(this.editId || this.courseId) {
        const obj = {
          ...this.step1Component.form.value,
          id: this.editId ? this.editId : this.courseId,
          empId: this.empId
        }
        this.userService.updateCourse(obj).subscribe({
          next: () => {
            this.toastr.success('Course updated successfully', 'Success');
          }
        })
      } else {
        const obj = {
          ...this.step1Component.form.value,
          empId: this.empId
        }
        this.userService.createCourse(obj).subscribe({
          next: (res: any) => {
             this.courseId = res.id;
             this.toastr.success('Course Created successfully', 'Success');
          }
          })
      }  
    }
  }

  createCourse() {
    this.toastr.success('Course and topics updated successfully', 'Success');
    this.router.navigateByUrl('/dashboard/courses');
  }
}
