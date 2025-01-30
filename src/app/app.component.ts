import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { MasterComponent } from "./components/master/master.component";
import { SignInComponent } from "./sign-in/sign-in.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp';
}
