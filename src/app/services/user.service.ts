import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/user'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiUrl}/profile`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiUrl}/update-profile`, profile, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }
}
