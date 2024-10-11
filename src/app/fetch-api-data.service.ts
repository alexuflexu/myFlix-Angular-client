import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Base URL of the API.
const apiUrl = 'https://movie-api-1-34lz.onrender.com/';

/**
 * Service for fetching data from the movie API.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Constructs the FetchApiDataService.
   * @param {HttpClient} http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param {any} userDetails - The details of the user to register.
   * @returns {Observable<any>} An observable of the registration response.
   */
  public userRegister(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user.
   * @param {any} userDetails - The details of the user to log in.
   * @returns {Observable<any>} An observable of the login response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all movies.
   * @returns {Observable<any>} An observable of the list of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a movie by its title.
   * @param {string} title - The title of the movie to retrieve.
   * @returns {Observable<any>} An observable of the movie details.
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + encodeURIComponent(title), {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves movies by a director's name.
   * @param {string} directorName - The name of the director.
   * @returns {Observable<any>} An observable of the movies directed by the specified director.
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  
    return this.http.get(apiUrl + 'movies/directors/' + encodeURIComponent(directorName), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves movies by genre.
   * @param {string} genreName - The name of the genre.
   * @returns {Observable<any>} An observable of the movies in the specified genre.
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + encodeURIComponent(genreName), {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a user by username.
   * @param {string} username - The username of the user to retrieve.
   * @returns {Observable<any>} An observable of the user details.
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves favorite movies for a user.
   * @param {string} username - The username of the user.
   * @returns {Observable<any>} An observable of the user's favorite movies.
   */
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's favorites.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to add.
   * @returns {Observable<any>} An observable of the addition response.
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Edits user details.
   * @param {string} username - The username of the user to edit.
   * @param {any} userDetails - The new user details.
   * @returns {Observable<any>} An observable of the edit response.
   */
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user by username.
   * @param {string} username - The username of the user to delete.
   * @returns {Observable<any>} An observable of the deletion response.
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a movie from a user's favorites.
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to delete.
   * @returns {Observable<any>} An observable of the deletion response.
   */
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors by logging the error and returning an observable with a user-facing error message.
   * @param {HttpErrorResponse} error - The HTTP error response.
   * @returns {Observable<never>} An observable that emits an error.
   */
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
