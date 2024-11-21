import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlacePageRoutingModule } from './edit-place-routing.module';

import { EditPlacePage } from './edit-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPlacePageRoutingModule
  ],
  declarations: [EditPlacePage]
})
export class EditPlacePageModule {}
