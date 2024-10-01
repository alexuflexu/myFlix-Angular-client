import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://movie-api-1-34lz.onrender.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
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
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  // Get one movie by title
  public getOneMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + title).pipe(
      catchError(this.handleError)
    );
  }

  // Get director by name
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + 'directors/' + directorName).pipe(
      catchError(this.handleError)
    );
  }

  // Get genre by name
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + 'genres/' + genreName).pipe(
      catchError(this.handleError)
    );
  }

  // Get user by username
  public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username).pipe(
      catchError(this.handleError)
    );
  }

  // Get favorite movies for a user
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username + '/movies').pipe(
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + 'users/' + username, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user by username
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a movie from favorite movies
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId).pipe(
      catchError(this.handleError)
    );
  }

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