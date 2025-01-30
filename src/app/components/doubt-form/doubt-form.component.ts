import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../store/reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-doubt-form',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './doubt-form.component.html',
  styleUrl: './doubt-form.component.css'
})
export class DoubtFormComponent  {

  constructor() {}

  employeeForm: FormGroup = new FormGroup({
        code: new FormControl("", Validators.required),
        name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        phone: new FormControl("", Validators.required)
      });

      send() {

      }
}
