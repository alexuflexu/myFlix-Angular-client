import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  editing: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    if (this.userData.Username) {
      this.fetchApiData.getUser(this.userData.Username).subscribe((res) => {
        this.userData = res;
        this.getFavoriteMovies();
      }, (error) => {
        this.snackBar.open('Failed to fetch user profile.', 'OK', {
          duration: 2000
        });
      });
    } else {
      this.snackBar.open('No user logged in.', 'OK', { duration: 2000 });
    }
  }

  getFavoriteMovies(): void {
    if (this.userData.Username) {
      this.fetchApiData.getFavoriteMovies(this.userData.Username).subscribe((movies) => {
        this.favoriteMovies = movies;
      }, (error) => {
        this.snackBar.open('Failed to load favorite movies.', 'OK', {
          duration: 2000
        });
      });
    }
  }

  saveProfile(): void {
    // Implement save profile logic here
  }

  resetUser(): void {
    this.getUser();
  }

  logout(): void {
    localStorage.removeItem("user");
    this.router.navigate(["welcome"]);
  }
}