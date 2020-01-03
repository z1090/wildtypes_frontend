import { Component, OnInit } from '@angular/core';
import { SightingsService } from './sightings.service';
import { Sighting } from './sighting.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.page.html',
  styleUrls: ['./sightings.page.scss'],
})
export class SightingsPage implements OnInit {
  logoSvg: string;
  plusSvg: string;
  loadedSightings: Sighting[];
  shownSightings: Sighting[];
  private sightingsSub: Subscription;
  searchVisible = false;
  private filter = 'yours';


  constructor(private sightingsService: SightingsService, private authService: AuthService) { }

  ngOnInit() {
    this.logoSvg = '/assets/logo.svg';
    this.plusSvg = '/assets/plus.svg';
    this.sightingsSub = this.sightingsService.sightings.subscribe(sightings => {
      this.loadedSightings = sightings;
    });
    // this.loadedSightings = this.sightingsService.sightings;
  }

  ionViewWillEnter() {
    // this.isLoading = true;
    this.sightingsService.fetchSightings().subscribe(() => {
      // this.isLoading = false;
    });
  }

  searchVisibleToggle() {
    this.searchVisible = !this.searchVisible;
  }

  onFilterUpdate(filter: string) {
    this.shownSightings = this.loadedSightings.filter(sighting => filter === 'all' || sighting.userId === this.authService.userId);
    this.filter = filter;
  }

}
