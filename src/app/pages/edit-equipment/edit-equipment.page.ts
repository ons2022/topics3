import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../interfaces/equipment';
import * as L from 'leaflet';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.page.html',
  styleUrls: ['./edit-equipment.page.scss']
})
export class EditEquipmentPage implements OnInit {
  public equipment: Equipment = {
    _id: '',
    name: '',
    latitude: 0,
    longitude: 0,
    functionalityDescription: '',
    locationDescription: '',
    contactPhone: '',
    username: ''
  };

  public isEditing: boolean = false;
  private map!: L.Map;
  private userMarker!: L.Marker;
  private equipmentMarker!: L.Marker;

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadEquipment(id);
    } else {
      this.isEditing = false;
      this.getUserLocation(); // Get user location only when adding new equipment
    }
  }

  private loadEquipment(id: string) {
    this.equipmentService.getEquipmentById(id).subscribe((data: Equipment) => {
      this.equipment = data;
      // Initialize the map with the equipment's location
      this.initMap(this.equipment.latitude, this.equipment.longitude);
    });
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        this.equipment.latitude = userLatitude;
        this.equipment.longitude = userLongitude;

        this.initMap(userLatitude, userLongitude);
      }, (error) => {
        console.error('Error getting location', error);
        // Handle error here (e.g., notify user)
      });
    } else {
      console.log('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }

  private initMap(userLatitude: number, userLongitude: number) {
    if (this.map) {
      this.map.remove(); // Clear the map if it already exists
    }
    this.map = L.map('map').setView([userLatitude, userLongitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    if (this.isEditing && this.equipment.latitude && this.equipment.longitude) {
      if (this.equipmentMarker) {
        this.map.removeLayer(this.equipmentMarker);
      }
      this.equipmentMarker = L.marker([this.equipment.latitude, this.equipment.longitude]).addTo(this.map)
        .bindPopup('Équipement: ' + this.equipment.name)
        .openPopup();
    }

    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }
    this.userMarker = L.marker([userLatitude, userLongitude], { icon: L.icon({ iconUrl: 'assets/user-icon.png', iconSize: [32, 32] }) })
      .addTo(this.map)
      .bindPopup('Votre position')
      .openPopup();
  }

  public validateEquipment(): boolean {
    return this.equipment.name !== '' &&
           this.equipment.functionalityDescription !== '' &&
           this.equipment.locationDescription !== '' &&
           this.equipment.contactPhone !== '' &&
           this.equipment.latitude !== 0 &&
           this.equipment.longitude !== 0;
  }

  public saveEquipment() {
    if (this.isEditing) {
      this.equipmentService.updateEquipment(this.equipment._id, this.equipment).subscribe(() => {
        this.router.navigate(['/equipment']);
      }, error => {
        console.error('Error updating equipment', error);
        // Handle error here (e.g., notify user)
      });
    } else {
      this.equipment.username = 'current-username'; // You should replace this with the actual username from authentication
      this.equipmentService.addEquipment(this.equipment).subscribe(() => {
        this.router.navigate(['/equipment']);
      }, error => {
        console.error('Error adding equipment', error);
        // Handle error here (e.g., notify user)
      });
    }
  }
}
