import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://192.168.146.137:8087/api'; 

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      return new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  getProtectedData(): Observable<any> {
    const url = `${this.baseUrl}/protected-resource`;
    const headers = this.getHeaders();

    return this.httpClient.get(url, { headers });
  }
}
