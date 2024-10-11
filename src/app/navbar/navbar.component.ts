import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  /**
   * Function to navigate to the movies page
   */
  launchMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Function to navigate to the user profile page
   */
  launchProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Function to log out the user and clear local storage
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(["/welcome"]);
  }
}
