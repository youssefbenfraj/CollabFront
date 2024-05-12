import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Document } from '../models/Document.model';


@Injectable({
  providedIn: 'root'
})
export class StripeService {
  constructor(private http: HttpClient) {}

  createCheckoutSession(documents: Document[]) {
    return this.http.post<{ url: string }>('http://localhost:8080/create-checkout-session', { documents });
  }
}
