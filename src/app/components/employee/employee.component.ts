import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/interface/User';
import { UserService } from '../../service/user.service';
import { MaterialModule } from '../../material.module';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [MaterialModule, CommonModule],
  standalone:true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
   displayedColumns: string[] = ["code", "name", "email", "phone","status", "action"];
   dataSource: any;
   employeeList! : User[];
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   permission: any;
   user = signal<string>('');
   title!: string;
   listingTitle!: string;
   role!: string;

   constructor(private userService: UserService, private toaster: ToastrService, private router: Router) {}

   ngOnInit(): void {
    const userString = localStorage.getItem('userObject') ?? ''
      let userData: { userRole: string } = {userRole : 'admin'};
      userData = JSON.parse(userString);
    this.user.set(userData.userRole);
    this.setAccess(this.user());
    this.role = userData.userRole == 'staff' ? 'user' : 'staff';
    this.loadEmployees(this.role);
     }

     loadEmployees(userRole: string) {
      this.userService.getUsersByRole(userRole).subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource<User>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
     }

     setAccess(userRole: string) {
      const menuCode = userRole == 'staff' ? 'customers' : 'employee';
      this.title = userRole == 'staff' ? 'Add Customer' : 'Add Employee';
      this.listingTitle = userRole == 'staff' ? 'Customer' : 'Employee';
      this.userService.getMenuPermission(userRole, menuCode).subscribe({
        next: (res: any) => {
          this.permission = res;
        }
      })
     }

     editEmployee(user: User) {
      if(this.permission[0].haveEdit) {
        this.router.navigate(['/dashboard/employee/edit/',user.code], {
          state: {employee: user}
        })
      } else {
        this.toaster.warning(`${this.user() == 'staff' ? 'Staff' : 'Admin'} not having Edit Access`, 'Warning')
      }
     }

     deleteEmployee(id: number) {
      if(confirm('Are you Sure to Delete') && this.permission[0].haveDelete) {
        this.userService.deleteEmployee(id).subscribe({
          next: () => {
            this.toaster.success('Deleted successfully', 'Success');
            this.loadEmployees(this.role);
          },
          error: (err: any) => {
            this.toaster.error('Due to' + err, 'Failed');
          }
        })
      } else {
          this.toaster.warning(`${this.user() == 'staff' ? 'Staff' : 'Admin'} not having delete access `, 'Warning')
      }
     }

     addEmployee() {
      if(this.permission[0].haveAdd) {
        this.router.navigate(['/dashboard/employee/add'], {
          state: {...history.state, userRole: this.user() }
        });
      } else {
        this.toaster.warning(`${this.user() == 'staff' ? 'staff' : 'admin'} not having add access`, 'Warning')
      }
     }
}
