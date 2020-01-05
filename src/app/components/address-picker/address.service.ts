import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SightingLocation } from 'src/app/sightings/location.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getCoords(address: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${environment.googleMapsAPIKey}`)
      .pipe(map(geoData => {
        if (!geoData || !geoData.results || geoData.results.length === 0) {
          return null;
        }
        const coords = {
          lat: geoData.results[0].geometry.location.lat,
          lng: geoData.results[0].geometry.location.lng,
        };
        return coords;
      }));
  }


  getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`)
        .pipe(map(geoData => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        }));
  }

  getMapImage(lat: number, lng: number, zoom: number) {
    // tslint:disable-next-line: max-line-length
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Place%7C${lat},${lng}&key=${environment.googleMapsAPIKey}`;
  }

  createLocationfromCoords(lat: number, lng: number) {
    const location: SightingLocation = {
      lat,
      lng,
      address: null,
      mapImage: null
    };
    return this.getAddress(lat, lng).pipe(
      switchMap(address => {
        location.address = address;
        return of(this.getMapImage(location.lat, location.lng, 14));
      }),
      map((mapImage: string) => {
        location.mapImage = mapImage;
        return location;
      }));
  }

  createLocationfromAddress(address: string) {
    const location: SightingLocation = {
      lat: null,
      lng: null,
      address,
      mapImage: null
    };
    return this.getCoords(address).pipe(
      switchMap(coords => {
      location.lat = coords.lat;
      location.lng = coords.lng;
      return of(this.getMapImage(location.lat, location.lng, 17));
    }),
    map((mapImage: string) => {
      location.mapImage = mapImage;
      return location;
    }));
  }

}
