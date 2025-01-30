import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/interface/User';
import { Router } from '@angular/router';
import { AssignUser } from '../../model/interface/AssignUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-course',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './assign-course.component.html',
  styleUrl: './assign-course.component.css'
})
export class AssignCourseComponent implements OnInit {

  userList: User[] = [];
  empList: User[] = [];
  assignList: AssignUser[] = [];
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {}
  ngOnInit() {
    this.loadAssignList();
    this.loadEmployees();
  }

  assignForm: FormGroup = new FormGroup({
            userId: new FormControl('', Validators.required),
            empId: new FormControl('', Validators.required)
          });

  loadAssignList() {
   this.userService.getAllAssign().subscribe({
    next: (assignRes: any) => {
      this.assignList = assignRes;

      this.loadUsers();
    }
   })
  }        
  loadUsers() {
   this.userService.getUsersByRole('user').subscribe({
    next: (res: any) => {
      const activeUsers = res.filter((user: any) => user.status === true);

      const filteredUsers = activeUsers.filter((user: any) => {
        return !this.assignList.some((assign: any) => assign.userId === user.id);
      });
      this.userList = filteredUsers;
    }
   })
  }

  loadEmployees() {
   this.userService.getUsersByRole('staff').subscribe({
    next: (res: any) => {
      const activeUsers = res.filter((user: any) => user.status === true);
      this.empList = activeUsers;
    }
   })
  }

  save() {
    if(this.assignForm.valid) {
      this.userService.getAssignUsers(this.assignForm.value.empId).subscribe({
        next: (res: any) => {
            this.userService.assignUser(this.assignForm.value).subscribe({
              next: () => {
              this.router.navigateByUrl('/dashboard/courses');
              this.toastr.success('User assigned to this employee', 'Success');
              }
            })
        }
      })
    }
  }
   
}
