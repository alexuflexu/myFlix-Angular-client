import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  editing: boolean = false;
  newPassword: string = '';
  newBirthday: string = '';
  newUsername: string = '';
  newEmail: string = '';

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
        this.newUsername = this.userData.Username;
        this.newPassword = '';
        this.newEmail = this.userData.Email;
        this.newBirthday = moment(this.userData.Birthday).format('YYYY-MM-DD');
        this.getFavoriteMovies();
      }, (error) => {
        this.snackBar.open('Failed to fetch user profile.', 'OK', { duration: 2000 });
      });
    } else {
      this.snackBar.open('No user logged in.', 'OK', { duration: 2000 });
    }
  }

  saveProfile(): void {
    if (this.userData.Username && this.newPassword) {
      const updatedData: any = {
        Username: this.newUsername, 
        Email: this.newEmail,
        Birthday: this.newBirthday,
        Password: this.newPassword,
      };
  
      // Only add the Password field if a new password is provided
      if (this.newPassword) {
        updatedData.Password = this.newPassword;
      }
  
      // Call the API to update the user profile
      this.fetchApiData.editUser(this.userData.Username, updatedData).subscribe((res) => {
        this.userData = {
          ...res,
          id: res._id,
          password: this.newPassword || this.userData.Password,
        };
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.editing = false;
        this.snackBar.open('Profile updated successfully.', 'OK', { duration: 2000 });
      }, (error) => {
        console.error('Update error:', error);
        this.snackBar.open('Failed to update profile. Please check your input.', 'OK', { duration: 2000 });
      });
    } else {
      this.snackBar.open('Password is mandatory!.', 'OK', { duration: 2000 });
    }
  }

  deleteUser(): void {
    if (this.userData.Username) {
      this.fetchApiData.deleteUser(this.userData.Username).subscribe((res) => {
        this.logout();
      }, (error) => {
        this.snackBar.open('Failed to delete user.', 'OK', { duration: 2000 });
      });
    } else {
      this.snackBar.open('No user logged in.', 'OK', { duration: 2000 });
    }
  }

  toggleFavorite(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.favoriteMovies.find(m => m._id === movieId)) {
      this.fetchApiData.deleteFavoriteMovie(user.Username, movieId).subscribe(() => {
        this.favoriteMovies = this.favoriteMovies.filter(mId => mId !== movieId);
        this.getFavoriteMovies();
        this.snackBar.open('Removed from favorites.', 'OK', { duration: 2000 });
        user.FavoriteMovies = this.favoriteMovies;
        localStorage.setItem('user', JSON.stringify(user));
        this.refresh();
      });
    }
  }

  getFavoriteMovies(): void {
    if (this.userData.Username) {
      this.fetchApiData.getAllMovies().subscribe((movies) => {
        this.favoriteMovies = movies.filter((m: any) => this.userData.FavoriteMovies.includes(m._id));
      }, (error) => {
        this.snackBar.open('Failed to load favorite movies.', 'OK', { duration: 2000 });
      });
    }
  }

  resetUser(): void {
    this.getUser();
  }

  refresh(): void {
    window.location.reload();
  }

  logout(): void {
    localStorage.removeItem("user");
    this.router.navigate(["welcome"]);
  }
}