import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDirectorDetails();
  }

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
}
