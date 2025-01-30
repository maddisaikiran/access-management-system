import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  // constructor(private http: HttpClient) {

  // }
  rolesList: IRole [] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getAllRoles().subscribe((res: IRole[]) => {
      this.rolesList = res;
    });
  }

  getAllRoles(): Observable<IRole[]> {
    const staticData: IRole[] = [
      { roleId: 1, role: 'Super Admin' },
      { roleId: 2, role: 'Admin' },
      { roleId: 3, role: 'Manager' },
      { roleId: 4, role: 'TL'},
      { roleId: 5, role: 'Junior Developer'}
    ];
    return of(staticData);
  }

//   getAllRoles() {
//  this.http.get("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res: any) => {
//   this.rolesList = res.data;
//  }) 
//   }
//  firstName: string = "Angular Tutorials";
//  angularVersion = "version 18";
//  version: number = 18;
//  isActive : boolean = false;
//  currentDate : Date = new Date();
//  inputType: string = "radio";
//  selectedState: string = "";

//  showWelcome() {
//   alert("welcome to Angular 19 tutorial")
//  }
//  showMsgAlert(msg: string) {
//    alert(msg)
//  }

}
