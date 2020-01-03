import { Component, OnInit, OnDestroy } from '@angular/core';
import { SightingsService } from '../sightings.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Sighting } from '../sighting.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { img1, mapImg } from '../test-base64-images';

@Component({
  selector: 'app-edit-sighting',
  templateUrl: './edit-sighting.page.html',
  styleUrls: ['./edit-sighting.page.scss'],
})
export class EditSightingPage implements OnInit, OnDestroy {
  sighting: Sighting;
  sightingId: string;
  form: FormGroup;
  certaintyValue: string;
  ratingValue: string;
  isLoading = false;
  private sightingSubscription: Subscription;


  constructor(
    private sightingsService: SightingsService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('sightingId')) {
        return this.navCtrl.navigateBack('/sightings');
      }
      this.isLoading = true;
      this.sightingId = paramMap.get('sightingId');
      this.sightingSubscription = this.sightingsService
        .getSighting(this.sightingId)
          .subscribe(sighting => {
            this.sighting = sighting;
            this.certaintyValue = sighting.certainty.toString();
            this.ratingValue = sighting.useageRating.toString();
            this.form = new FormGroup({
              tName: new FormControl(sighting.typefaceName, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              certainty: new FormControl(sighting.certainty, {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              bName: new FormControl(sighting.businessName, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              category: new FormControl(sighting.category, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              rating: new FormControl(sighting.useageRating, {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              location: new FormControl(sighting.location.address, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
            });
            this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'Error!',
            message: 'Details for that sighting could not be fetched. Please try again later.',
            buttons: [{text: 'Okay', handler: () => {
              this.navCtrl.navigateBack('/sightings');
            }}]
          }).then(alertEl => {
            alertEl.present();
          })
        });
    });
  }

  onUpdateSighting() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Editing...'
    }).then(loadingEL => {
      loadingEL.present();
    });
    const sightingUpdates = {
      // ...this.sighting,
      typefaceName: this.form.value.tName !== this.sighting.typefaceName ? this.form.value.tName : null,
      certainty: +this.form.value.certainty !== this.sighting.certainty ? +this.form.value.certainty : null,
      businessName: this.form.value.bName !== this.sighting.businessName ? this.form.value.bName : null,
      category: this.form.value.category !== this.sighting.category ? this.form.value.category : null,
      useageRating: +this.form.value.rating !== this.sighting.useageRating ? +this.form.value.rating : null,
      location: { lat: 123, lng: 456, address: this.form.value.location, mapImage: mapImg},
      photo: img1 !== this.sighting.photo ? img1 : null,
    };
    Object.entries(sightingUpdates).forEach(update => (update[1] === null ? delete sightingUpdates[update[0]] : 0));
    console.log(sightingUpdates);
    this.sightingsService.editSighting(sightingUpdates, this.sighting.id)
      .subscribe(() => {
        this.navCtrl.navigateBack(['/', 'sightings', this.sighting.id]);
        this.loadingCtrl.dismiss();
      });
  }

  ngOnDestroy() {
    if (this.sightingSubscription) {
      this.sightingSubscription.unsubscribe();
    }
  }

}
