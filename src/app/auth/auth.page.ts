import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  logoSvg: string;
  isSignup: boolean;
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.logoSvg = '/assets/logo.svg';
    this.form = new FormGroup({
      username: new FormControl(this.authService.userId, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(8)]
      }),
    });
  }

  ionViewWillEnter() {
    this.isSignup = this.authService.isSignup;
  }

  onProcessAuth() {
    this.authService.login(this.form.value.username);
    if (this.authService.isSignup) {
      return this.router.navigate(['welcome']);
    }
    return this.router.navigate(['sightings']);
  }

  onToggleisSignUp() {
    this.isSignup = !this.isSignup;
    this.authService.isSignup = this.isSignup;
  }

}
