import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Course } from '../../model/interface/Course';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../model/interface/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';

@Component({
  selector: 'app-products',
  imports: [MaterialModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  userService = inject(UserService);
  toastr = inject(ToastrService);
  router = inject(Router);

  courses!: Course[];
  permission: any;
  userData!: User;
  userRole = signal<string>('');
  cols = 3;
    rowHeight = '500px';

    constructor(private store: Store<AppState>) {

    }
  ngOnInit() {
   let name = this.store.select('user').subscribe({
    next: (data: any) => {
      console.log(data);
    }
   });
   console.log(name);
    this.loadPermission();
    this.loadCourses();
  }

  loadCourses() {
    if(this.userData.id && this.userData.userRole == 'user') {
      this.userService.getAssignEmployees(this.userData.id).subscribe({
       next: (assignEmp: any) => {
          if(assignEmp.length > 0) {
            this.userService.getCoursesById(assignEmp[0].empId).subscribe({
              next: (courses: any) => {
                this.courses = courses;
              }
            })
          } else {
            this.toastr.warning('No Courses found', 'Warning');
          }
       }
      })
    } else if(this.userData.id && this.userData.userRole == 'staff') {
    this.userService.getCoursesById(this.userData.id).subscribe({
      next: (res: any) => {
        this.courses = res;
      }
    })
    } else {
      this.userService.getAllCourses().subscribe({
        next: (res: any) => {
          this.courses = res;
        }
      })
    }
  }

  loadPermission() {
    const userString = localStorage.getItem('userObject') ?? ''
      this.userData = JSON.parse(userString);
    this.userService.getMenuPermission(this.userData.userRole, 'courses').subscribe({
      next: (res: any) => {
        this.permission = res[0];
      }
    })
  }

  editCourse(id: number) { 
   if (this.permission.haveEdit) {
      const course = this.courses.find((crs) => crs.id == id);
      this.router.navigate(['/dashboard/course/edit/',id], {
        state: { course }
      })
    } else {
      this.toastr.warning('User Not have Access', 'Warning');
    }
  }

  getTopicIdsByCourseId(courseId: string, topics: any): string[] {
    return topics
      .filter((topic: { courseId: string; }) => topic.courseId === courseId)
      .map((topic: { id: { toString: () => any; }; }) => topic.id.toString());
  }

  deleteCourse(id: any) {
    if(this.permission.haveDelete) {
      this.userService.getTopicsByCourseId(id).subscribe({
        next:(topics: any) => {
          const ids = this.getTopicIdsByCourseId(id, topics);
          if(ids.length > 0) {
            this.userService.deleteTopics(ids).subscribe({
              next: (res: any) => {
                this.userService.deleteCourse(id).subscribe({
                  next:() => {
                    if(confirm('Are you Sure to Delete')) {
                    this.toastr.success('Deleted successfully', 'Success');
                    this.loadCourses();
                    }
                  }
                })
              }
            })
          } else {
            this.userService.deleteCourse(id).subscribe({
              next:() => {
                if(confirm('Are you Sure to Delete')) {
                this.toastr.success('Deleted successfully', 'Success');
                this.loadCourses();
                }
              }
            })
          } 
        }
      })
    }
  }

  viewCourse(id: any) {
    this.router.navigate(['/dashboard/course/view/',id]);
  }

}
