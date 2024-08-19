import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  userModel: User = {
    _id: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    age: 0,
    email: '',
    password: '',
    role: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  async signup() {
    try {
      await this.authService.signup(this.userModel).toPromise();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Signup failed', error);
    }
  }
}
