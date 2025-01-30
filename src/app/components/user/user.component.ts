import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/interface/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [MaterialModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
displayedColumns: string[] = ["name", "email", "phone","status","role", "action"];
   dataSource: any;
   userList! : User[];
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

   constructor(private userService: UserService, private dialog: MatDialog) {}
   
   ngOnInit(): void {
    this.loadUsers();
     }

     loadUsers() {
      this.userService.getAllUsers().subscribe({
        next: (res: any) => {
          this.userList = res;
          this.dataSource = new MatTableDataSource<User>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
     }

     updateRole(name: string, id: string) {
       this.openPopup(name, id, 'role');
     }
     updateStatus(name: string, id: string) {
       this.openPopup(name, id, 'status');
     }

     openPopup(name: string, id: string, type: string) {
      this.dialog.open(UserUpdateComponent, {
        width: '30%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
           name: name,
           id: id,
           type: type
        }
      }).afterClosed().subscribe({
        next: (res: any) => {
          console.log(res);
          this.loadUsers();
        }
      })
     }
}
