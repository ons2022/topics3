import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';

import { Equipment } from '../../interfaces/equipment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss']
})
export class EquipmentPage implements OnInit {

  public equipmentList: Equipment[] = [];
  public searchTerm: string = '';

  constructor(private equipmentService: EquipmentService , private router : Router ) { }

  ngOnInit() {
    this.loadEquipment();
  }

  private loadEquipment(): void {
    this.equipmentService.getAllEquipment().subscribe((data: Equipment[]) => {
      this.equipmentList = data;
    });
  }
  public searchEquipment(): void {
    this.equipmentService.searchEquipment(this.searchTerm).subscribe((data: Equipment[]) => {
      this.equipmentList = data;
    });
  }
  editEquipment(id: string) {
    this.router.navigate(['/edit-equipment', id]);
  }
  addEquipment() {
    this.router.navigate(['/edit-equipment']);
  }
  deleteEquipment(id: string) {
    this.equipmentService.deleteEquipment(id).subscribe(() => {
      this.loadEquipment(); // Refresh list after deletion
    });
  }
}
