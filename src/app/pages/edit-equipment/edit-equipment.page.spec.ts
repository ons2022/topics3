import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEquipmentPage } from './edit-equipment.page';

describe('EditEquipmentPage', () => {
  let component: EditEquipmentPage;
  let fixture: ComponentFixture<EditEquipmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
