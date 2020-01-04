import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SightingsPage } from './sightings.page';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SightingsPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new-sighting/new-sighting.module').then( m => m.NewSightingPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'edit/:sightingId',
    loadChildren: () => import('./edit-sighting/edit-sighting.module').then( m => m.EditSightingPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: ':sightingId',
    loadChildren: () => import('./sighting-detail/sighting-detail.module').then( m => m.SightingDetailPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SightingsPageRoutingModule {}
