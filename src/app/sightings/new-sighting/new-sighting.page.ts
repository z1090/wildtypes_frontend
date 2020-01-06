import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { SightingLocation } from '../location.model';

import { SightingsService } from '../sightings.service';
import { AddressService } from 'src/app/components/address-picker/address.service';

@Component({
  selector: 'app-new-sighting',
  templateUrl: './new-sighting.page.html',
  styleUrls: ['./new-sighting.page.scss'],
})
export class NewSightingPage implements OnInit {
  form: FormGroup;
  certaintyValue = 0;
  ratingValue = 3;
  recievedAddress: string;
  recievedLocation: SightingLocation;

  constructor(
    private sightingsService: SightingsService,
    private addressService: AddressService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      tName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(80)]
      }),
      certainty: new FormControl(0, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      bName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(80)]
      }),
      category: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      categoryOther: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.maxLength(50)]
      }),
      rating: new FormControl(3, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      photo: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.form.setErrors(null);
    this.setCategoryValidators();
  }

  onCheckForm() {
    if (!this.form.valid) {
      return;
    }
    this.checkAddress();
  }

  createSighting() {
    const category = this.form.value.categoryOther ? this.form.value.categoryOther : this.form.value.category;
    this.loadingCtrl.create({
      message: 'Adding Sighting...'
    }).then(loadingEL => {
      loadingEL.present();

      this.sightingsService.addSighting(
        this.form.value.tName,
        +this.form.value.certainty,
        this.form.value.bName,
        category,
        +this.form.value.rating,
        this.recievedLocation,
        this.form.value.photo,
      )
      .subscribe(() => {
        this.loadingCtrl.dismiss();
        this.form.reset();
        this.form.get('certainty').setValue(0);
        this.form.get('rating').setValue(3);
        this.router.navigate(['/sightings']);
      });
    });
  }

  onPickedPhoto(imageData: string) {
    this.form.patchValue({photo: imageData});
  }

  onRecievedLocation(recievedLocation: SightingLocation) {
    this.recievedLocation = recievedLocation;
  }

  onNewAddress(newAddress: string) {
    this.recievedAddress = newAddress;
    this.form.patchValue({location: newAddress});
  }

  checkAddress() {
    if (this.recievedLocation && (this.recievedLocation.address === this.recievedAddress)) {
      return this.createSighting();
    }
    this.loadingCtrl.create({
      message: 'Checking Address...'
    }).then(loadingEL => {
      loadingEL.present();

      this.addressService.createLocationfromAddress(this.recievedAddress).subscribe((newLocation) => {
        this.loadingCtrl.dismiss();
        this.recievedLocation = newLocation;
        this.createSighting();
    });


    });
  }

  setCategoryValidators() {
    this.form.get('category').valueChanges
      .subscribe(category => {
        if (category === 'Other') {
          this.form.get('categoryOther').setValidators([Validators.required]);
          this.form.get('categoryOther').updateValueAndValidity();
        } else {
          this.form.get('categoryOther').setValidators(null);
          this.form.get('categoryOther').setValue(null);
          this.form.get('categoryOther').updateValueAndValidity();
        }
      });
  }
}
