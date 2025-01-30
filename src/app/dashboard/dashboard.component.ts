import { Component, DoCheck, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/interface/Menu';
import { UserService } from '../service/user.service';
import { ProfileComponent } from "../profile/profile.component";
import { User } from '../model/interface/User';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, DoCheck {

  constructor(private userService: UserService, private router: Router) {}
  menuList!: Menu[];
  loginUser = signal<string>('');

  ngOnInit(): void {
    console.log(history.state);
    const userString = localStorage.getItem('userObject') ?? '';
    let user: { userRole?: string} = {};
    if(userString) {
      user = JSON.parse(userString);
      if(user.userRole) {
        this.userService.loadMenuByRole(user.userRole).subscribe({
          next: (res: any) => {
            this.menuList = res[0].menu;
          }
        })
      }
      }
    }
  ngDoCheck(): void {
    const userString = localStorage.getItem('userObject') ?? '';
    let user: { name?: string } = {};
if (userString) {
    user = JSON.parse(userString);
}
    this.loginUser.set(user.name as string);
  }

  goToProfile() {
    const userString = JSON.parse(localStorage.getItem('userObject') ?? '');
    this.router.navigate(['/dashboard/profile'], {
      state: {...history.state, user: userString }
    });
  }
}
