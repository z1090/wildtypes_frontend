import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, filter, switchMap } from 'rxjs/operators';


import { Sighting } from './sighting.model';
import { AuthService } from '../auth/auth.service';
import { SightingLocation } from './location.model';


// import { img1, img2, img3 } from './test-base64-images';
// [
//   new Sighting(
//     'id123',
//     'defaultUser',
//     new Date(),
//     'Helvetica',
//     95,
//     'New York Subway',
//     'Street Sign',
//     3,
//     {lat: 123, lng: 456, address: '371 Fieldstone Drive, Brooklyn, NY 11230', mapImage: 'base64img'},
//     img1
//   ),
//   new Sighting(
//     'id46',
//     'defaultUser',
//     new Date(),
//     'Gotham',
//     50,
//     'Netflix',
//     'Poster',
//     5,
//     {lat: 456, lng: 234, address: '999 Cheese Lane, Brooklyn, NY 11230', mapImage: 'base64img'},
//     img2
//   ),
//   new Sighting(
//     'id46',
//     'defaultUser2',
//     new Date(),
//     'Futura',
//     100,
//     'Alfa Romeo',
//     'Shop Sign',
//     4,
//     {lat: 456, lng: 234, address: '17 Highfield Close, Semington, Trowbridge', mapImage: 'base64img'},
//     img3
//   )
// ];

interface SightingDBData {
  _id: string;
  userId: string;
  date: string;
  typefaceName: string;
  certainty: number;
  businessName: string;
  category: string;
  useageRating: number;
  location: SightingLocation;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class SightingsService {
  private _sightings = new BehaviorSubject<Sighting[]>([]);
  private databaseURL = 'http://127.0.0.1:3000/sightings';

  get sightings() {
    return this._sightings.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchSightings() {
    return this.http.get<SightingDBData[]>(this.databaseURL)
    .pipe(
      map(resData => {
        return resData.map(sighting => new Sighting(
          sighting._id,
          sighting.userId,
          new Date(sighting.date),
          sighting.typefaceName,
          sighting.certainty,
          sighting.businessName,
          sighting.category,
          sighting.useageRating,
          {
            lat: sighting.location.lat,
            lng: sighting.location.lng,
            address: sighting.location.address,
            mapImage: sighting.location.mapImage
          },
          sighting.photo
        ));
      }),
      tap(resData => {
        this._sightings.next(resData);
      })
    );
  }

  getSighting(id: string) {
    return this.http.get<SightingDBData>(`${this.databaseURL}/${id}`)
    .pipe(
      map(sighting => {
        return new Sighting(
          sighting._id,
          sighting.userId,
          new Date(sighting.date),
          sighting.typefaceName,
          sighting.certainty,
          sighting.businessName,
          sighting.category,
          sighting.useageRating,
          {
            lat: sighting.location.lat,
            lng: sighting.location.lng,
            address: sighting.location.address,
            mapImage: sighting.location.mapImage
          },
          sighting.photo
        );
      })
    );
  }

}
