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

  /**
   * Function to fetch all movies from the API
   */
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

  /**
   * Function to load favorite movies from local storage
   */
  loadFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.FavoriteMovies.length > 0) {
      this.favoriteMovies = user.FavoriteMovies;
      this.updateFavoriteStatus();
    }
  }

  /**
   * Function to update the favorite status of movies
   */
  updateFavoriteStatus(): void {
    this.movies.forEach((movie) => {
      movie.isFavorite = this.favoriteMovies.includes(movie._id);
    });
  }

  /**
   * Function to toggle the favorite status of a movie
   * @param movieId - ID of the movie to toggle
   */
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

  /**
   * Function to navigate to the details of a specific movie
   * @param title - Title of the movie to navigate to
   */
  navigateToMovie(title: string): void {
    this.router.navigate(['/movies', title]);
  }

  /**
   * Function to navigate to the genre page for a specific movie
   * @param movie - Movie object to retrieve genre information
   */
  showGenre(movie: any): void {
    this.router.navigate(['/genre', movie.Genre.Name]);
  }

  /**
   * Function to navigate to the director page for a specific movie
   * @param movie - Movie object to retrieve director information
   */
  showDirector(movie: any): void {
    this.router.navigate(['/director', movie.Director.Name]);
  }

  /**
   * Function to navigate to the synopsis page for a specific movie
   * @param movie - Movie object to retrieve title information
   */
  showDetail(movie: any): void {
    this.router.navigate(['/synopsis', movie.Title]);
  }
}
