import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSightingPageRoutingModule } from './edit-sighting-routing.module';

import { EditSightingPage } from './edit-sighting.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditSightingPageRoutingModule
  ],
  declarations: [EditSightingPage]
})
export class EditSightingPageModule {}
