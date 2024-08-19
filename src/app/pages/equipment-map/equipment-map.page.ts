import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../interfaces/equipment';

@Component({
  selector: 'app-equipment-map',
  templateUrl: './equipment-map.page.html',
  styleUrls: ['./equipment-map.page.scss'],
})
export class EquipmentMapPage implements OnInit {
  map!: L.Map;
  equipments: Equipment[] = [];
  userLocation: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 };

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit() {
    this.getUserLocation();
  }

  initMap() {
    this.map = L.map('map').setView([this.userLocation.latitude, this.userLocation.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Définir les icônes personnalisées
    const equipmentIcon = L.icon({
      iconUrl: 'assets/images/equipment-icon.png', // Remplacez par le chemin de votre icône
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const userIcon = L.divIcon({
      className: 'user-icon',
      html: '<div style=" background-color: #ff0000;  color: #ffffff; border-radius: 50%;  width: 10px;  height: 40px;  display: flex; align-items: center;  justify-content: center; font-size: 4px; font-weight: bold;  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);  text-transform: uppercase; ">You</div>',
      iconSize: [30, 30]
    });

    // Ajouter les équipements à la carte
    this.equipments.forEach(equipment => {
      L.marker([equipment.latitude, equipment.longitude], { icon: equipmentIcon })
        .addTo(this.map)
        .bindPopup(`<b>${equipment.name}</b><br>${equipment.locationDescription}`);
    });

    // Ajouter le marqueur de l'emplacement de l'utilisateur
    L.marker([this.userLocation.latitude, this.userLocation.longitude], { icon: userIcon })
      .addTo(this.map);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.initMap();
        this.loadEquipments();
      });
    } else {
      console.log('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }

  loadEquipments() {
    this.equipmentService.getAllEquipment().subscribe((data: Equipment[]) => {
      this.equipments = data;
      if (this.map) {
        this.equipments.forEach(equipment => {
          L.marker([equipment.latitude, equipment.longitude], { icon: L.icon({
            iconUrl: 'assets/equipment-icon.jpg', // Remplacez par le chemin de votre icône
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          }) })
            .addTo(this.map)
            .bindPopup(`<b>${equipment.name}</b><br>${equipment.locationDescription}`);
        });
      }
    });
  }
}
