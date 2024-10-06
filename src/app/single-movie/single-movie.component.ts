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
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.fetchApiData.getOneMovie(title).subscribe((resp: any) => {
        this.movie = resp;
      }, (error) => {
        this.snackBar.open('Failed to load movie details.', 'OK', {
          duration: 2000
        });
      });
    }
  }

  viewDirector(directorName: string): void {
    this.router.navigate(['/director', directorName]);
  }

  viewGenre(genreName: string): void {
    this.router.navigate(['/genre', genreName]);
  }
}
