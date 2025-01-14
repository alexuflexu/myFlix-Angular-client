import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {
  movie: any;

  constructor(
    private fetchApiData: FetchApiDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch movie synopsis on component initialization
    this.getMovieSynopsis();
  }

  /**
   * Function to fetch the movie synopsis based on the title from the route
   */
  getMovieSynopsis(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.fetchApiData.getOneMovie(title).subscribe((resp: any) => {
        this.movie = resp;
      }, (error) => {
        // Display error message if fetching the movie synopsis fails
        this.snackBar.open('Failed to load movie synopsis.', 'OK', {
          duration: 2000
        });
      });
    }
  }
}
