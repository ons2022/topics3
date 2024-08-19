import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEquipmentPage } from './edit-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: EditEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEquipmentPageRoutingModule {}
