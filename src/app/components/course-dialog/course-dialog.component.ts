import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-dialog',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.css'
})
export class CourseDialogComponent implements OnInit {

  dialogData: any;
  btnTitle!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<CourseDialogComponent>) {

  }
  ngOnInit() {
   if(!this.data.add) {
    this.btnTitle = 'EDIT';
    this.dialogData = this.data.topic.find((top: { id: any; }) => top.id == this.data.id);
    this.form.setValue({
     title: this.dialogData.title,
     longDescription: this.dialogData.longDescription
   })
   } else {
    this.btnTitle = 'ADD';
   }
  }

form: FormGroup = new FormGroup({
        title: new FormControl("", [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)
        ]),
        longDescription: new FormControl('', [Validators.required, Validators.minLength(3)])
      });

  get topicTitle() {
      return this.form.controls['title'];
    } 

    closePopup() {
      this.ref.close();
    }

    addTopic() {
        this.ref.close(this.form.value);
    }
}
