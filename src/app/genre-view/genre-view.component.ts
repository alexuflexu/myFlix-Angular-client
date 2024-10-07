import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  genre: any;

  constructor(
    private fetchApiData: FetchApiDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getGenreDetails();
  }

  getGenreDetails(): void {
    const genreName = this.route.snapshot.paramMap.get('genreName');
    if (genreName) {
      this.fetchApiData.getGenre(genreName).subscribe((resp: any) => {
        this.genre = resp;
      }, (error) => {
        this.snackBar.open('Failed to load genre details.', 'OK', {
          duration: 2000
        });
      });
    }
  }
}
