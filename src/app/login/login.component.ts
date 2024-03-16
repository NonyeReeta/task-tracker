import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  current_view:string = 'signin';

  constructor(
    private router: Router
  ) {};

  signIn() {
    this.router.navigate(['/']);
  }
}
