import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdmineService {
  private apiUrl = 'http://localhost:5000/api/admin/users'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }
}
