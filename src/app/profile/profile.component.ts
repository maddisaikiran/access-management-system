import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userService = inject(UserService);
  toastr = inject(ToastrService);
  router = inject(Router);
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
  });

ngOnInit(): void {
  this.employeeForm.setValue({
    name: history.state.user.name,
    phone: history.state.user.phone,
    email: history.state.user.email
  });
}

saveDetails() {
  this.userService.updateEmployee({...history.state.user,...this.employeeForm.value }).subscribe({
    next: (res: any) => {
      console.log(res);
      this.toastr.success('Updated successfully', 'Success');
      localStorage.setItem('userObject', JSON.stringify(res));
      this.router.navigateByUrl('/dashboard');
    }, error: () => {
      this.toastr.error('Some thing went wrong');
    }
  })
}
}
