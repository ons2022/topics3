import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEquipmentPageRoutingModule } from './edit-equipment-routing.module';

import { EditEquipmentPage } from './edit-equipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEquipmentPageRoutingModule
  ],
  declarations: [EditEquipmentPage]
})
export class EditEquipmentPageModule {}
