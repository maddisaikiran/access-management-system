import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/interface/User';
import { UserService } from '../../service/user.service';
import { Roles } from '../../model/interface/Roles';

@Component({
  selector: 'app-user-update',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{
  dialogData: any;
  userData!: User;
  roleList!: Roles[]; 
  type = '';
  constructor(private builder: FormBuilder, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any,
private userService: UserService, private ref: MatDialogRef<UserUpdateComponent>) {}

  ngOnInit(): void {
    this.loadRoles();
    this.dialogData = this.data;
    this.type= this.dialogData.type;
    if(this.dialogData.name !== '') {
      this.userService.getUserById(this.dialogData.id).subscribe({
        next: (item: any) => {
          this.userData = item;
          this.userForm.setValue({
            name: this.userData.name,
            role: this.userData.userRole,
            status: this.userData.status
          })
        }
      })
    }
  }

  loadRoles() {
    this.userService.getAllRoles().subscribe({
      next: (res: any) => {
       this.roleList = res;
      }
    })
  }

  userForm: FormGroup = new FormGroup({
        name: new FormControl({value:'', disabled: true}),
        role: new FormControl("", Validators.required),
        status: new FormControl(true, Validators.required)
      });

      proceedChange() {
        if(this.userForm.valid) {
          console.log(this.userData, this.dialogData.name, this.userForm.value.role);
          this.userService.updateEmployee({...this.userData, name: this.dialogData.name, userRole: this.userForm.value.role, status: this.userForm.value.status}).subscribe({
            next: (res: any) => {
              this.toastr.success('Updated Successfully', this.type === 'role' ? 'Role Updated' : 'Status Updated')
              this.closePopup();
            },
            error: () => {
              this.toastr.error('Some thing went wrong', 'Failed');
            }
          })
        }
      }

      closePopup() {
       this.ref.close();
      }


}
