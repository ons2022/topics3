import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any = {};

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = data;
      },
      (error) => {
        console.error('Error loading profile:', error);
      }
    );
  }

  updateProfile() {
    this.profileService.updateProfile(this.profile).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        // Ajoutez ici des notifications ou des redirections si nécessaire
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
