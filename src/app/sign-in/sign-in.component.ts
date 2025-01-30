import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/interface/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../material.module';
import { environment } from '../../environments/environment';
import { AppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { updateName } from '../store/userAction';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, MaterialModule ,ReactiveFormsModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, 
    private toastr: ToastrService, private renderer: Renderer2, private store: Store<AppState>) {}

  isRightPanelActive = false;
  toastrSuccess: any;
  @ViewChild('signInEmailInput') signInEmailInput!: ElementRef;
  @ViewChild('signUpNameInput') signUpNameInput!: ElementRef;

  userObj: User = { id: 0, name: '', email: '', password: '', userRole: '', status: false };
  baseUrl = environment.apiUrl;
  userData: User | undefined;


  signUpForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    password: new FormControl("", [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/)])
  })

  togglePanel(isSignUp: boolean): void {
    this.isRightPanelActive = isSignUp;
    if (isSignUp) {
      setTimeout(() => {
        this.renderer.selectRootElement(this.signUpNameInput.nativeElement).focus();
      }, 0);
    } else {
      setTimeout(() => {
        this.renderer.selectRootElement(this.signInEmailInput.nativeElement).focus();
      }, 0);
    }
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onSignUp() {
    const storedMaxId = localStorage.getItem('maxUserId');
  const currentMaxId = storedMaxId ? +storedMaxId : 0;

  const nextId = currentMaxId + 1;
  const role = "user";

  localStorage.setItem('maxUserId', nextId.toString());
  const newUser = { ...this.signUpForm.value, id: nextId, userRole: role, status: true };
    this.http.post(this.baseUrl + "users", newUser).subscribe({
      next: (res: any) => {
        this.togglePanel(false);
        this.toastrSuccess = this.toastr.success("User Created Successfully",'Success', {timeOut: 1000});
        setTimeout(() => {
          this.toastr.info("Please sign in", "Info", {timeOut: 1000});
          this.renderer.selectRootElement(this.signInEmailInput.nativeElement).focus();
        }, 1000);
      },
      error: () => {
        this.toastr.error("Some thing Went Wrong");
      } 
    })
  }

  onSignIn(event: Event) {
    event.preventDefault();
     this.http.get<User[]>(this.baseUrl + "users")
    .subscribe({
     next: (res: User[]) => {
      this.userData = res.find((user: User) => {
        return (
          user.email === this.userObj.email &&
          user.password === this.userObj.password &&
          user.status === true
        );
      });
      if (this.userData) {
          this.store.dispatch(updateName({name: this.userData.name}));
          localStorage.setItem("userObject", JSON.stringify(this.userData));
          this.resetForm();  
        this.router.navigate(["dashboard/courses"]);
        this.toastr.success("Sign In Successfully")
      } else {
        this.toastr.info("Invalid credentials or inactive user");
      }
     },
     error: (err: any) => {
       this.toastr.error("Sign in Failed, Some thing went wrong");
    },
    })
    }

    resetForm() {
      this.userObj = { id: 0, name: '', email: '', password: '', userRole: '' };
    }
}
