import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {

  
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
  }
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
