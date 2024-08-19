import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user: any = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    age: null,
    email: '',
    password: '',
    role: 'User', // Default role
  };
  userId: string ='';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser() {
    this.http.get<any>(`http://localhost:5000/api/admin/users/${this.userId}`).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error loading user:', error);
      }
    );
  }

  async updateUser() {
    try {
      await this.http.put(`http://localhost:5000/api/admin/users/${this.userId}`, this.user).toPromise();
      const toast = await this.toastController.create({
        message: 'User updated successfully.',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.router.navigate(['/manage-users']);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}
