import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exchange } from '../models/book-details.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  addExchange(exchange: Exchange): Observable<Exchange> {
   
    return this.http.post<Exchange>(`${this.baseUrl}/addExchange`, exchange);  
  }

  getExchangeById(id: number): Observable<Exchange> {
   
    return this.http.get<Exchange>(`${this.baseUrl}/getExchangeById/${id}`);
  }

  getAllEX(): Observable<Exchange[]> {
    
    return this.http.get<Exchange[]>(`${this.baseUrl}/getAllEx`); 
  }

  deleteExchange(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEx/${id}`);
  }
  

  updateExchange(id: number, exchange: Exchange): Observable<Exchange> {
    
    return this.http.put<Exchange>(`${this.baseUrl}/updateEX/${id}`, exchange);
  }
  


}

  

