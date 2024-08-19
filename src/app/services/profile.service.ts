import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/user'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile(): Observable<any> {
    return this.authService.isAuthenticated.pipe(
      switchMap((authenticated: boolean) => {
        if (authenticated) {
          return this.http.get<any>(`${this.apiUrl}/profile`);
        }
        return throwError(() => new Error('Not authenticated'));
      })
    );
  }

  updateProfile(profileData: any): Observable<any> {
    return this.authService.isAuthenticated.pipe(
      switchMap((authenticated: boolean) => {
        if (authenticated) {
          return this.http.post<any>(`${this.apiUrl}/update-profile`, profileData);
        }
        return throwError(() => new Error('Not authenticated'));
      })
    );
  }
}
