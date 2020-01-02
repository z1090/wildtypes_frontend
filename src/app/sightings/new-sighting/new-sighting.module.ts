import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSightingPageRoutingModule } from './new-sighting-routing.module';

import { NewSightingPage } from './new-sighting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSightingPageRoutingModule
  ],
  declarations: [NewSightingPage]
})
export class NewSightingPageModule {}
