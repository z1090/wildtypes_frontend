import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { of, Subscription, BehaviorSubject } from 'rxjs';


import { SightingLocation } from '../../sightings/location.model';
import { environment } from '../../../environments/environment';
import { AddressService } from './address.service';


@Component({
  selector: 'app-address-picker',
  templateUrl: './address-picker.component.html',
  styleUrls: ['./address-picker.component.scss'],
})
export class AddressPickerComponent implements OnInit {
  @Output() locationObject = new EventEmitter<SightingLocation>();
  @Output() addressEmitter = new EventEmitter<string>();
  @Input() currentAddress: string;

  enteredAddress: string;

  constructor(
    private addressService: AddressService,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.enteredAddress = this.currentAddress;
  }


  changedAddress(newAddress: string) {
    this.enteredAddress = newAddress;
    this.addressEmitter.emit(this.enteredAddress);
  }

  getLocation() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      return this.showErrorAlert();
    }

    this.loadingCtrl.create({
      message: 'Getting Address...'
    }).then(loadingEL => {
      loadingEL.present();

      Plugins.Geolocation.getCurrentPosition()
        .then(position => {
          this.createLocationObject(position.coords.latitude, position.coords.longitude);
        })
        .catch(err => {
          this.loadingCtrl.dismiss();
          console.log(err);
          this.showErrorAlert();
        });
    });
  }

  private showErrorAlert() {
    this.alertCtrl.create({
      header: 'Could not fetch location',
      message: 'Please try again later.',
      buttons: ['Okay']
    }).then(alertEl => alertEl.present());
  }

  private createLocationObject(lat: number, lng: number) {
    this.addressService.createLocationfromCoords(lat, lng)
      .subscribe((location) => {
        this.enteredAddress = location.address;
        this.locationObject.emit(location);
        this.addressEmitter.emit(this.enteredAddress);
        this.loadingCtrl.dismiss();
      });
  }


}
