import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SightingsService } from '../sightings.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { img1, mapImg } from '../test-base64-images';

@Component({
  selector: 'app-new-sighting',
  templateUrl: './new-sighting.page.html',
  styleUrls: ['./new-sighting.page.scss'],
})
export class NewSightingPage implements OnInit {
  form: FormGroup;
  certaintyValue = '0';
  ratingValue = '3';

  constructor(private sightingsService: SightingsService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      tName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      certainty: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      bName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      rating: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
    });
  }

  onCreateSighting() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
    this.loadingCtrl.create({
      message: 'Adding Sighting...'
    }).then(loadingEL => {
      loadingEL.present();

      this.sightingsService.addSighting(
        this.form.value.tName,
        +this.form.value.certainty,
        this.form.value.bName,
        this.form.value.category,
        +this.form.value.rating,
        { lat: 123, lng: 456, address: this.form.value.location, mapImage: mapImg},
        img1,
      )
      .subscribe(() => {
        this.loadingCtrl.dismiss();
        this.form.reset();
        this.router.navigate(['/sightings']);
      });
    });
  }
}
