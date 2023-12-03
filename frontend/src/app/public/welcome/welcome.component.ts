import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/public/register'])
  }

  navigateToLogin() {
    this.router.navigate(['/public/login'])
  }
}

