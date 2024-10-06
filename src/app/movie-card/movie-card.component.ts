import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.loadFavoriteMovies();
    }, (error) => {
      this.snackBar.open('Failed to load movies.', 'OK', {
        duration: 2000
      });
    });
  }

  loadFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.FavoriteMovies.length > 0) {
      this.favoriteMovies = user.FavoriteMovies;
      this.updateFavoriteStatus();
    }
  }

  updateFavoriteStatus(): void {
    this.movies.forEach((movie) => {
      movie.isFavorite = this.favoriteMovies.includes(movie._id);
    });
  }

  toggleFavorite(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.favoriteMovies.includes(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(user.Username, movieId).subscribe(() => {
        this.favoriteMovies = this.favoriteMovies.filter(mId => mId !== movieId);
        this.updateFavoriteStatus();
        this.snackBar.open('Removed from favorites.', 'OK', {
          duration: 2000
        });
      });
    } else {
      this.fetchApiData.addFavoriteMovie(user.Username, movieId).subscribe(() => {
        this.favoriteMovies.push(movieId);
        this.updateFavoriteStatus();
        this.snackBar.open('Added to favorites.', 'OK', {
          duration: 2000
        });
      });
    }
    
    user.FavoriteMovies = this.favoriteMovies;
    localStorage.setItem('user', JSON.stringify(user));
  }

  navigateToMovie(title: string): void {
    this.router.navigate(['/movies', title]);
  }

  showGenre(movie: any): void {
    this.router.navigate(['/genre', movie.Genre.Name]);
  }

  showDirector(movie: any): void {
    this.router.navigate(['/director', movie.Director.Name]);
  }

  showDetail(movie: any): void {
    this.router.navigate(['/synopsis', movie.Title]);
  }
}
