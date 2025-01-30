import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Roles } from '../../model/interface/Roles';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { MenuPermission } from '../../model/interface/Menupermission';

@Component({
  selector: 'app-user-role',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.css'
})
export class UserRoleComponent implements OnInit{
  roleList!: Roles[];
  menuList!: Roles[];
  accessArray!: FormArray<any>;
  userAccess!: MenuPermission

  constructor(private toastr: ToastrService, private userService: UserService) {}
  ngOnInit(): void {
    this.loadRoles();
    this.getMenus();
  }

  roleForm: FormGroup = new FormGroup({
          userRole: new FormControl('', Validators.required),
          access: new FormArray([])
        });

  generateMenuRow(input: Roles, access: MenuPermission[], role: string): FormGroup[] {
    return access.map((permission) => 
      new FormGroup({
        menuCode: new FormControl(input.code),
        id:  new FormControl(permission.id),
        haveView: new FormControl(permission.haveView),
        haveAdd: new FormControl(permission.haveAdd),
        haveEdit: new FormControl(permission.haveEdit),
        haveDelete: new FormControl(permission.haveDelete),
        userRole: new FormControl(role)
      })
    );
  }

  addNewRow(input: Roles, access: MenuPermission[], role: string) {
    const newRows = this.generateMenuRow(input, access, role);
    newRows.forEach((row) => this.accessArray.push(row));
  }

   get getRows() {
    return this.roleForm.get('access') as FormArray;
   }
   
   loadRoles() {
    this.userService.getAllRoles().subscribe({
      next: (res: any) => {
        this.roleList = res;
      }
    })
   }

   getMenus() {
    this.accessArray = this.roleForm.get('access') as FormArray;
    this.accessArray.clear();
    this.userService.getAllMenus().subscribe({
      next: (res: any) => {
        this.menuList = res;
        this.menuList.forEach((menu) => {
          this.addNewRow(menu, [
            {
              userRole: '',
              menuCode: '',
              name: '',
              haveView: false,
              haveAdd: false,
              haveEdit: false,
              haveDelete: false,
              id: ''
            }
          ], '');
        });
      }
    })
   }

   loadMenus(userRole: string) {
    this.accessArray = this.roleForm.get('access') as FormArray;
    this.accessArray.clear();
        if(this.menuList.length > 0) {
          if(userRole!='') {
            this.userService.getMenusByUserRole(userRole).subscribe({
              next: (permissions: any) => {
                this.menuList.forEach((menu) => {
                  const matchedPermissions = permissions.filter(
                    (permission: { menuCode: string; }) => permission.menuCode === menu.code
                  );
                  this.addNewRow(menu, matchedPermissions, userRole);
                });
              },
              error: (err: any) => {
                console.error('Error fetching permissions:', err);
              }
            });
          } else {
            this.menuList.forEach((menu) => {
              this.addNewRow(menu, [
                {
                  userRole: '',
                  menuCode: '',
                  name: '',
                  haveView: false,
                  haveAdd: false,
                  haveEdit: false,
                  haveDelete: false,
                  id: ''
                }
              ], '');
            });
          }
      }
   }

   roleChange(event: any) {
    let selectedRole = event.value;
    this.loadMenus(selectedRole)
   }

   saveRoles() {
    let formArray = this.roleForm.value.access as MenuPermission[]
    console.log(formArray);
    formArray.forEach((item) => {
      this.userService.assignRolePermission(item).subscribe({
          next: () => {
          // this.toastr.success('Changes updated Successfully', 'success');    
          },
          error: (err: any) => {
              console.error('Error updating:', err);
          }
      });
  });
   }
}
