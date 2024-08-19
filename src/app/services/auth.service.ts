import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Update this with your backend URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storage: Storage) {
    this.checkToken();
  }

  async checkToken() {
    const token = await this.storage.get('token');
    this.isAuthenticatedSubject.next(!!token);
  }

   // AuthService
login(email: string, password: string) {
  return this.http.post<{ token: string, result: any }>(`${this.apiUrl}/login`, { email, password }).pipe(
    tap(async (response) => {
      await this.storage.set('token', response.token);
      await this.storage.set('user', JSON.stringify(response.result)); // Stocker les informations de l'utilisateur
      localStorage.setItem('token', response.token); // Stocker le jeton dans localStorage
      localStorage.setItem('userRole', response.result.role); // Stocker le rôle dans localStorage
      this.isAuthenticatedSubject.next(true);
    })
  );
}


  signup(user: any) {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('user'); // Clear user info
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userRole'); // Remove role from localStorage
    this.isAuthenticatedSubject.next(false);
  }

  get isAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): Observable<string | null> {
    return from(this.storage.get('token'));
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
