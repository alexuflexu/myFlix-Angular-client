import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component'; 

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
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
      // TODO: Clean it up later
      this.favoriteMovies = user.FavoriteMovies;
      this.updateFavoriteStatus();
    }
    console.log("Got Favorite Movies", this.favoriteMovies);
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
      }, (error) => {
        this.snackBar.open('Failed to remove from favorites.', 'OK', {
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
      }, (error) => {
        this.snackBar.open('Failed to add to favorites.', 'OK', {
          duration: 2000
        });
      });
    }
    
    user.FavoriteMovies = this.favoriteMovies;
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  showGenre(movie: any): void {
    const genreType = movie.genre ? String(movie.genre.name).toUpperCase() : 'Unknown Genre';
    const genreDescription = movie.genre ? movie.genre.description : 'No description available.';
    
    this.dialog.open(MessageBoxComponent, {
        data: {
            title: genreType,
            content: genreDescription
        },
        width: "400px"
    });
  }

  showDirector(movie: any): void {
    const directorName = movie.director ? movie.director.name : 'Unknown Director';
    
    const directorDescription = movie.director ? movie.director.bio : 'No biography available.';
    
    this.dialog.open(MessageBoxComponent, {
        data: {
            title: directorName,
            content: directorDescription
        },
        width: "400px"
    });
  }

  showDetail(movie: any): void {
    const movieDescription = movie.description ? movie.description : 'No description available.';
    
    this.dialog.open(MessageBoxComponent, {
        data: {
            title: movie.title,
            content: movieDescription
        },
        width: "400px"
    });
  }
}