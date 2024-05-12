import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getLevels() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8087/api';
  constructor(private http: HttpClient, private router: Router) {}

  addUser(userData: { [key: string]: any }): Observable<any> {
    const formData: FormData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'image') {
        formData.append('file', value, value.name); 
      } else {
        formData.append(key, value); 
      }
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    return this.http.post<any>(`${this.apiUrl}/addUser`, formData, { headers: headers });
  }
 getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllUsers`);
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserById/${userId}`);
  }
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateUser/${userId}`, userData);
  }

deleteUser(id: number): Observable<any> {
  const url = `${this.apiUrl}/deleteUser/${id}`;
  return this.http.delete(url);
}
getUserProfile(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/profile`);
}

deactivateUser(userId: number, duration: string): Observable<any> {
  const url = `${this.apiUrl}/${userId}/deactivate`;
  const params = new HttpParams().set('duration', duration);
  return this.http.post(url, {}, { params });
}

reactivateUser(userId: number): Observable<any> {
  const url = `${this.apiUrl}/${userId}/reactivate`;  // Ensure the URL matches the backend endpoint
  return this.http.post<any>(url, {}).pipe(
    catchError(error => throwError(() => new Error(`Error reactivating user: ${error.message}`)))
  );
}
getLeaderboardS(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/leaderboardStudent`);
}

}
