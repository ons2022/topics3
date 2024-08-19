import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentMapPage } from './equipment-map.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentMapPageRoutingModule {}
