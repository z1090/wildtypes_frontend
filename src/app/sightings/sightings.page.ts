import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { SightingsService } from './sightings.service';
import { Sighting } from './sighting.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.page.html',
  styleUrls: ['./sightings.page.scss'],
})
export class SightingsPage implements OnInit, OnDestroy {
  @ViewChild('autofocus', { static: false }) searchbar: IonSearchbar;
  logoSvg: string;
  plusSvg: string;
  loadedSightings: Sighting[];
  searchedSightings: Sighting[];
  shownSightings: Sighting[];
  searchVisible = false;
  lastSearchTerm: string;
  isLoading = false;
  pageTitle = 'Contributions';
  private sightingsSub: Subscription;
  private filter = 'yours';


  constructor(private sightingsService: SightingsService, private authService: AuthService) { }

  ngOnInit() {
    this.logoSvg = '/assets/logo.svg';
    this.plusSvg = '/assets/plus.svg';
    this.sightingsSub = this.sightingsService.sightings.subscribe(sightings => {
      this.loadedSightings = sightings.reverse();
      this.searchedSightings = sightings;
      this.onFilterUpdate(this.filter);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.sightingsService.fetchSightings().subscribe(() => {
      if (this.searchVisible) {
        this.searching(this.lastSearchTerm);
      }
      this.isLoading = false;
    });
  }

  searchVisibleToggle() {
    this.searchVisible = !this.searchVisible;
  }

  private dateToString(entry) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let m: string | number = entry.getMonth();
      m = months[m];
      let d: string | number = entry.getDate();
      d = d.toString().length > 1 ? d : `0${d.toString()}`;
      const y = entry.getFullYear();
      return `${m} ${d}, ${y}`;
  }

  searching(searchTerm) {
    this.lastSearchTerm = searchTerm;
    this.pageTitle = 'Search';
    this.searchedSightings = this.loadedSightings.filter(sighting => {
      return Object.keys(sighting).some(key => {
        if (key === 'photo' || key === 'id') {
          return false;
        }
        let entry = sighting[key];
        if (key === 'location') {
          entry = entry.address;
        }
        if (entry instanceof Date) {
          entry = this.dateToString(entry);
        }
        if (typeof entry === 'number') {
          entry = key === 'certainty' ? `${entry} ${entry}%` : `${entry} ${entry}/5`;
        }
        if (typeof entry === 'string') {
          return entry.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });
    });
    this.onFilterUpdate(this.filter);
  }

  searchClicked() {
    this.searchVisibleToggle();
    if (this.searchVisible === false) {
      this.searchVisible = false;
      this.clearSearch();
    } else {
      setTimeout(() => this.searchbar.setFocus(), 500);
    }
  }

  clearSearch() {
    this.pageTitle = 'Contributions';
    this.searchedSightings = this.loadedSightings;
    this.onFilterUpdate(this.filter);
  }

  onFilterUpdate(filter: string) {
    this.shownSightings = this.searchedSightings.filter(sighting => filter === 'all' || sighting.userId === this.authService.userId);
    this.filter = filter;
  }

  ngOnDestroy() {
    if (this.sightingsSub) {
      this.sightingsSub.unsubscribe();
    }
  }

}
