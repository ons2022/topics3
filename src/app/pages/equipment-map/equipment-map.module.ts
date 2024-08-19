import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentMapPageRoutingModule } from './equipment-map-routing.module';

import { EquipmentMapPage } from './equipment-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentMapPageRoutingModule
  ],
  declarations: [EquipmentMapPage]
})
export class EquipmentMapPageModule {}
