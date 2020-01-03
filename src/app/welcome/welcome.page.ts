import { Component, OnInit } from '@angular/core';
import { SightingsService } from '../sightings/sightings.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  logoSvg: string;

  constructor() { }

  ngOnInit() {
    this.logoSvg = '/assets/logo.svg';
  }

}
