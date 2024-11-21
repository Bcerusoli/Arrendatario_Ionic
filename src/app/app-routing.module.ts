import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'places', loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule) },
  
  { path: 'reservations/:placeId', loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsPageModule) },
  { path: 'add-place', loadChildren: () => import('./add-place/add-place.module').then(m => m.AddPlacePageModule) },
  { path: 'edit-place/:id', loadChildren: () => import('./edit-place/edit-place.module').then(m => m.EditPlacePageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }