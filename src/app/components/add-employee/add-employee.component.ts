import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-employee',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
 constructor(private toastr: ToastrService, private router: Router, private userService: UserService,
  private act: ActivatedRoute
 ) {}
  employeeData: any;
  title= history.state.userRole == 'staff' ? 'Add Customer' : 'Add Employee';
  editCode="";
  isEdit = false;
  ngOnInit(): void {
  
    this.editCode = this.act.snapshot.paramMap.get('code') as string;
    if(this.editCode != '' && this.editCode != null) {
      this.isEdit = true;
      this.title = 'Edit Employee';
      this.employeeForm.controls['code'].disable();
      this.employeeForm.setValue({
        code: history.state.employee.code,
        name: history.state.employee.name,
        password: history.state.employee.password,
        phone: history.state.employee.phone,
        email: history.state.employee.email,
        status: history.state.employee.status
      });
    }
  }

  employeeForm: FormGroup = new FormGroup({
      code: new FormControl("", Validators.required),
      name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required,
        Validators.minLength(7),
        Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/)]),
      status: new FormControl(true, Validators.required)
    });

    saveEmployee() {
      if(!this.isEdit) {
        const role = history.state.userRole == 'staff' ? 'user' : 'staff';
        this.userService.createEmployee({...this.employeeForm.value, userRole: role}).subscribe({
          next: (res: any) => {
            this.employeeData = res;
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/dashboard/employee');
          }, error: () => {
            this.toastr.error('Some thing went wrong');
          }
        })
      } else {
        this.userService.updateEmployee({...this.employeeForm.value, code: this.editCode, id: history.state.employee.id}).subscribe({
          next: (res: any) => {
            this.employeeData = res;
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/dashboard/employee');
          }, error: () => {
            this.toastr.error('Some thing went wrong');
          }
        })
      }
    }

}
