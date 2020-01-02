import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SightingDetailPageRoutingModule } from './sighting-detail-routing.module';

import { SightingDetailPage } from './sighting-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SightingDetailPageRoutingModule
  ],
  declarations: [SightingDetailPage]
})
export class SightingDetailPageModule {}
