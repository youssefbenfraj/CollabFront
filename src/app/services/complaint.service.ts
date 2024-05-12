import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint.model';
import { Traitement } from '../models/traitement.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private baseUrl = 'http://localhost:8087';  

  constructor(private http: HttpClient) { }

  //addComplaint(complaint: Complaint): Observable<Complaint> {
    //return this.http.post<Complaint>(`${this.baseUrl}/addComplaint`, complaint);
  //}
  addComplaint(complaintData: any): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/addComplaint`, complaintData);
}


  getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseUrl}/getComplaintById/${id}`);
  }

  getAllComplaint(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/getAllCM`);
  }

  deleteComplaint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCM/${id}`);
  }

  updateComplaint(id: number, complaint: Complaint): Observable<Complaint> {
    return this.http.put<Complaint>(`${this.baseUrl}/updateCM/${id}`, complaint);

  }
 //getcmbyuserid
 getComplaintsByUserId(userId: number): Observable<Complaint[]> { 
  const url = `${this.baseUrl}/userCM/${userId}`;
  return this.http.get<Complaint[]>(url);
} 
  

}
