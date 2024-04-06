import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  is_user_logged_in: boolean = true;

  constructor(
    private router: Router
  ) {};

  ngOnInit() {
    setTimeout(() => {
      if (this.is_user_logged_in === true) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 2000);

  }
}
