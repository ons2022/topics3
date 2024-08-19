import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController,
    private animationCtrl: AnimationController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Load all users
  loadUsers() {
    this.http.get<any[]>('http://localhost:5000/api/admin/users').subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  // Filter users based on search term
  filterUsers() {
    this.filteredUsers = this.users.filter(user => 
      user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Delete a user
  async deleteUser(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.http.delete(`http://localhost:5000/api/admin/users/${id}`).subscribe(
              async () => {
                this.users = this.users.filter(user => user._id !== id);
                this.filterUsers();
                const toast = await this.toastController.create({
                  message: 'User deleted successfully.',
                  duration: 2000,
                  color: 'success'
                });
                toast.present();
              },
              (error) => {
                console.error('Error deleting user:', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  // Navigate to the add user page
  addUser() {
    const fabButton = document.querySelector('ion-fab-button');
    if (fabButton) {
      const animation = this.animationCtrl.create()
        .addElement(fabButton as HTMLElement)  // Cast to HTMLElement
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'scale(1)', 'scale(1.3)');

      animation.play().then(() => {
        this.router.navigate(['/add-user']);  // Navigate to the add user page
      });
    } else {
      console.error('Fab button not found');
    }
  }

  // Edit or Update a user
  editUser(user: any) {
    this.router.navigate([`/edit-user/${user._id}`]);  // Navigate to the edit user page
  }
}
