import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSightingPage } from './new-sighting.page';

const routes: Routes = [
  {
    path: '',
    component: NewSightingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSightingPageRoutingModule {}
