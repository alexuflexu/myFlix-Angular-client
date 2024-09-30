import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://movie-api-1-34lz.onrender.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIDataService {
  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) {}

  // Making the API call for the user registration endpoint
  public userRegister(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(username: string, password: string): void {}

  // Get all movies
  public getAllMovies(): void {}

  // Get one movie by title
  public getOneMovie(title: string): void {}

  // Get director by name
  public getDirector(name: string): void {}

  // Get genre by name
  public getGenre(name: string): void {}

  // Get user by username
  public getUser(username: string): void {}

  // Get favorite movies for a user
  public getFavoriteMovies(username: string): void {}

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): void {}

  // Edit user
  public editUser(userDetails: any): void {}

  // Delete user by username
  public deleteUser(username: string): void {}

  // Delete a movie from favorite movies
  public deleteFavoriteMovie(username: string, movieId: string): void {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}