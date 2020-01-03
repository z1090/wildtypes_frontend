import { Component, OnInit } from '@angular/core';
import { Sighting } from '../sighting.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SightingsService } from '../sightings.service';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sighting-detail',
  templateUrl: './sighting-detail.page.html',
  styleUrls: ['./sighting-detail.page.scss'],
})
export class SightingDetailPage implements OnInit {
  sighting: Sighting;
  addressArr: string[];
  isLoading = false;
  authUserId: string;
  searchVisible = false;
  private sightingSubscription: Subscription;

  constructor(
    private sightingsService: SightingsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.authUserId = this.authService.userId;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.isLoading = true;
      if (!paramMap.has('sightingId')) {
        return this.navCtrl.navigateBack('/sightings');
      }
      this.sightingSubscription = this.sightingsService
        .getSighting(paramMap.get('sightingId'))
        .subscribe(sighting => {
          this.sighting = sighting;
          this.addressArr = this.sighting.location.address.split(',');
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occurred!',
            message: 'Could not load place.',
            buttons: [{text: 'Okay', handler: () => {
              this.navCtrl.navigateBack('/sightings');
            }}]
          })
          .then(alertEl => alertEl.present());
        });
    });
  }

  searchVisibleToggle() {
    this.searchVisible = !this.searchVisible;
  }

  onEdit(sightingId: string) {
    this.router.navigate(['/', 'sightings', 'edit', sightingId]);
  }

}
