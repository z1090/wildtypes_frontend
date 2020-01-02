import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  logo: string;

  constructor() {
  }

  ngOnInit() {
    this.logo = '/assets/logo.svg';
  }

}
