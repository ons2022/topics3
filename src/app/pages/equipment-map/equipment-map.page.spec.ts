import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentMapPage } from './equipment-map.page';

describe('EquipmentMapPage', () => {
  let component: EquipmentMapPage;
  let fixture: ComponentFixture<EquipmentMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
