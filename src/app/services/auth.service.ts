import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8087/api/auth';

   jwtToken: any; 
   userId: number | undefined;
  currentUserValue: any;
  constructor(private http: HttpClient, private router: Router) {}
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { username, password }).pipe(
      tap((response: any) => {
        this.userId = response.idUser; 
        this.jwtToken = response.token;
        localStorage.setItem('userData', JSON.stringify(response));

      })
    );
  }
  
  register(registerData: { [key: string]: any }): Observable<any> {
    const formData: FormData = new FormData();
    Object.entries(registerData).forEach(([key, value]) => {
      if (key === 'image') {
        formData.append('file', value, value.name); 
      } else {
        formData.append(key, value); 
      }
    });
  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    return this.http.post<any>(`${this.apiUrl}/signup`, formData, { headers: headers });
  }
  validateToken(token: string): Observable<any> {
    // Define the token data
    const tokenData = { token };
  
    // Define the HTTP headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    // Make the HTTP POST request to the backend and return the observable
    return this.http.post<any>('http://localhost:8087/api/auth/validateToken', tokenData, { headers });
}
  getJwtToken(): string | null {
    return this.jwtToken;
  }
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }
 
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.accessToken);
      })
    );
  }
  forgotPassword(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = new HttpParams();
    body = body.set('email', email);
    return this.http.post(`${this.apiUrl}/forgot-password`, body, { headers });
  }
  resetPassword(token: string, newPassword: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = new HttpParams();
    body = body.set('token', token).set('newPassword', newPassword);
    return this.http.post(`${this.apiUrl}/reset-password`, body, { headers });
  }

  verifyEmail(token: string) {
    this.http.get(`/api/auth/verifyEmail?token=${token}`).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Email verification failed:', error);
      }
    );
  }
  getCurrentUserId(): Observable<number> {
    return this.http.get<{ id: number }>('http://localhost:8087/api/auth/id').pipe(
      map(response => response.id)
    );
  }
  private clientId = 'a10c90b73715eabaa707';
  private clientSecret = '4f205685cecee6e889dd40e38d675858a0f74258';
  private redirectUri = 'http://localhost:4200/home';
  private accessTokenUrl = 'https://github.com/login/oauth/access_token';


  getGitHubAccessToken(code: string): Observable<any> {
    const url = `${this.accessTokenUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}&redirect_uri=${this.redirectUri}`;
    return this.http.post(url, {}).pipe(
      catchError((error) => {
        return throwError('Error exchanging GitHub code for access token: ' + error.message);
      })
    );
  }


  getGitHubUserData(accessToken: string): Observable<any> {
    const headers = {
      Authorization: `token ${accessToken}`
    };
    return this.http.get('https://api.github.com/user', { headers }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
 
}
