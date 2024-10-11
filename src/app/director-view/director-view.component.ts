import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  director: any = null;

  constructor(
    private fetchApiData: FetchApiDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.getDirectorDetails();
  }

  /**
   * Function to fetch director details using FetchApiDataService
   */
  getDirectorDetails(): void {
    const directorName = this.route.snapshot.paramMap.get('directorName');
    if (directorName) {
      this.fetchApiData.getDirector(directorName).subscribe((resp: any) => {
        this.director = resp;
      }, (error) => {
        this.snackBar.open('Failed to load director details.', 'OK', {
          duration: 2000
        });
      });
    }
  }

  /**
   * Function to navigate back to the movies page
   */
  goBackToMovies(): void {
    this.router.navigate(['/movies']); 
  }
}
