import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string ='';
  password: string='';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

   // LoginPage
async login() {
  if (this.email && this.password) {
    this.authService.login(this.email, this.password).subscribe(
      async (response) => {
        const { result, token } = response;
        if (result && token) {
          localStorage.setItem('authToken', token); // Stocke le jeton dans le stockage local

          // Vérifiez et gérez le rôle utilisateur
          const role = result.role;
          console.log('Role:', role);  // Ajoutez un log pour vérifier le rôle

          if (role === 'admin') {
            await this.router.navigate(['/admin-home']);
          } else if (role === 'user') {
            await this.router.navigate(['/user-home']);
          } else {
            await this.router.navigate(['/login']); // Redirige vers la connexion si le rôle est inconnu
          }
        } else {
          const toast = await this.toastController.create({
            message: 'Login failed. Please try again.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: 'Login failed. Please check your credentials.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  } else {
    const toast = await this.toastController.create({
      message: 'Please fill out the form correctly.',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }
}
}