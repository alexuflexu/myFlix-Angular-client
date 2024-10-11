import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {
  movie: any;

  constructor(
    private fetchApiData: FetchApiDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router 
  ) {}

  ngOnInit(): void {
    // Fetch movie details on component initialization
    this.getMovieDetails();
  }

  /**
   * Function to fetch the details of the movie based on the title from the route
   */
  getMovieDetails(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.fetchApiData.getOneMovie(title).subscribe((resp: any) => {
        this.movie = resp;
      }, (error) => {
        // Display error message if fetching the movie details fails
        this.snackBar.open('Failed to load movie details.', 'OK', {
          duration: 2000
        });
      });
    }
  }

  /**
   * Function to navigate to the director's page
   * @param directorName - The name of the director
   */
  viewDirector(directorName: string): void {
    this.router.navigate(['/director', directorName]);
  }

  /**
   * Function to navigate to the genre's page
   * @param genreName - The name of the genre
   */
  viewGenre(genreName: string): void {
    this.router.navigate(['/genre', genreName]);
  }

  /**
   * Function to navigate back to the movies list
   */
  goBackToMovies(): void {
    this.router.navigate(['/movies']);
  }
}
