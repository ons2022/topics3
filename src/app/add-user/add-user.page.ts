import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage {
  user = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    age: null,
    email: '',
    password: '',
    role: 'User', // Default role
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  async addUser() {
    try {
      await this.http.post('http://localhost:5000/api/auth/signup', this.user).toPromise();
      const toast = await this.toastController.create({
        message: 'User added successfully.',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.router.navigate(['/manage-users']);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
}
