import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  launchMovies(): void {
    this.router.navigate(['/movies']);
  }

  launchProfile(): void {
    this.router.navigate(['/profile']);
  }

  logoutUser(): void {
    localStorage.removeItem("user");
    this.router.navigate(["/welcome"]);
  }
}