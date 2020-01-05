import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PhotoSelectorComponent } from './photo-selector/photo-selector.component';
import { AddressPickerComponent } from './address-picker/address-picker.component';


@NgModule({
  declarations: [PhotoSelectorComponent, AddressPickerComponent],
  imports: [CommonModule, IonicModule],
  exports: [PhotoSelectorComponent, AddressPickerComponent]
})
export class ComponentsModule { }
