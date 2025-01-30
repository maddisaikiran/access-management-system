import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../model/interface/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {

  }
  baseUrl = environment.apiUrl;

  resetform: FormGroup = new FormGroup({
      oldpassword: new FormControl("", [Validators.required]),
      newpassword: new FormControl("", [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/)])
    })

    resetPassword() {
      if(this.resetform.valid) {
      const userString = localStorage.getItem('userObject') ?? ''
      let user: { id: number; name: string; email: string; password: string };
      
if (userString) {
    user = JSON.parse(userString);
    if(user.password === this.resetform.value.oldpassword) {
      const updateUser = { ...user, password: this.resetform.value.newpassword };
      this.http.put(this.baseUrl + "users/"+ user.id, updateUser).subscribe({
        next: (res: any) => {
          this.toastr.success('Please login with new password', 'Password changed');
          this.router.navigate(["sign-in"])
        },
        error: () => {
          this.toastr.error('Invalid password');
        }
      })
    } else {
      this.toastr.warning('Entered Old password was wrong, Please correct the Password');
    }
    }
  } else {
    this.toastr.warning('Entered Invalid Credentials');
  }
    }
}
