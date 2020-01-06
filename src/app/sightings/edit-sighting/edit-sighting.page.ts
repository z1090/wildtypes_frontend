import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Sighting } from '../sighting.model';
import { SightingLocation } from '../location.model';

import { SightingsService } from '../sightings.service';
import { AddressService } from 'src/app/components/address-picker/address.service';

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
  categoryValue: string;
  recievedAddress: string;
  recievedLocation: SightingLocation;
  isLoading = false;
  private sightingSubscription: Subscription;


  constructor(
    private sightingsService: SightingsService,
    private addressService: AddressService,
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
            this.recievedLocation = sighting.location;
            this.recievedAddress = sighting.location.address;
            if (this.isStandardCategory(sighting.category)) {
              this.categoryValue = sighting.category;
            } else {
              this.categoryValue = 'Other';
            }
            console.log('sighting.category: ', sighting.category);
            console.log('categoryValue: ', this.categoryValue);
            this.form = new FormGroup({
              tName: new FormControl(sighting.typefaceName, {
                updateOn: 'change',
                validators: [Validators.required, Validators.maxLength(80)]
              }),
              certainty: new FormControl(sighting.certainty, {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              bName: new FormControl(sighting.businessName, {
                updateOn: 'change',
                validators: [Validators.required, Validators.maxLength(80)]
              }),
              category: new FormControl(this.categoryValue, {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              categoryOther: new FormControl(this.categoryValue === 'Other' ? sighting.category : null, {
                updateOn: 'change',
                validators: [Validators.maxLength(50)]
              }),
              rating: new FormControl(sighting.useageRating, {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              location: new FormControl(sighting.location.address, {
                updateOn: 'change',
                validators: [Validators.required, Validators.maxLength(100)]
              }),
              photo: new FormControl(sighting.photo, {
                validators: [Validators.required]
              })
            });
            this.form.setErrors(null);
            this.setCategoryValidators();
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
          });
        });
    });
  }

  isStandardCategory(category) {
    const allCategories = [
      'Shop Sign',
      'Street Sign',
      'Poster',
      'Menu',
      'Billboard',
    ];
    let index: number | boolean = allCategories.indexOf(category);
    index = index === -1 ? false : true;
    return index;
  }

  checkCategory() {
    const sightingCategory = this.sighting.category;
    const category = this.form.value.category;
    const categoryOther = this.form.value.categoryOther;

    if ((category === 'Other' && sightingCategory === categoryOther) || (sightingCategory === category && categoryOther === null)) {
      return null;
    } else if (category !== 'Other') {
      return category;
    } else {
      return categoryOther;
    }

  }

  onCheckForm() {
    if (!this.form.valid) {
      return;
    }
    this.checkAddress();
  }

  updateSighting() {
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
      category: this.checkCategory(),
      useageRating: +this.form.value.rating !== this.sighting.useageRating ? +this.form.value.rating : null,
      // location: { lat: 123, lng: 456, address: this.form.value.location, mapImage: mapImg},
      location: this.recievedAddress !== this.sighting.location.address ? this.recievedLocation : null,
      photo: this.form.value.photo !== this.sighting.photo ? this.form.value.photo : null,
    };
    Object.entries(sightingUpdates).forEach(update => (update[1] === null ? delete sightingUpdates[update[0]] : 0));
    console.log('sightingUpdates: ', sightingUpdates);
    this.sightingsService.editSighting(sightingUpdates, this.sighting.id)
      .subscribe(() => {
        this.loadingCtrl.dismiss();
        this.navCtrl.navigateBack(['/', 'sightings', this.sighting.id]);
      });
  }

  onDeleteSighting() {
    this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure?',
      buttons: [
        {text: 'Cancel', handler: () => {}},
        {text: 'Okay', handler: () => {
        this.loadingCtrl.create({
          message: 'Deleting...'
        }).then(loadingEL => {
          loadingEL.present();
        });
        this.sightingsService.deleteSighting(this.sighting.id)
        .subscribe(() => {
          this.navCtrl.navigateBack('/sightings');
          this.loadingCtrl.dismiss();
        });
        }},
      ]
    }).then(alertEl => {
      alertEl.present();
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
      return this.updateSighting();
    }
    this.addressService.createLocationfromAddress(this.recievedAddress).subscribe((newLocation) => {
      this.recievedLocation = newLocation;
      this.updateSighting();
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

  ngOnDestroy() {
    if (this.sightingSubscription) {
      this.sightingSubscription.unsubscribe();
    }
  }

}
