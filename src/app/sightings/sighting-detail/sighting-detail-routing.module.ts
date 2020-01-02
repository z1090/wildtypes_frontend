import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SightingDetailPage } from './sighting-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SightingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SightingDetailPageRoutingModule {}
