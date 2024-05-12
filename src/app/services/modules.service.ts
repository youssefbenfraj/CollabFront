import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modules } from '../models/modules.model';
@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private baseUrl = 'http://localhost:8087';  

  constructor(private http: HttpClient) { }

  addModules(modules: Modules): Observable<Modules> {
    return this.http.post<Modules>(`${this.baseUrl}/addModules`, modules);
  }

  getModulesById(id: number): Observable<Modules> {
    return this.http.get<Modules>(`${this.baseUrl}/getModulesById/${id}`);
  }

  getAllModules(): Observable<Modules[]> {
    return this.http.get<Modules[]>(`${this.baseUrl}/getAllMD`);
  }

  deleteModules(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMD/${id}`);
  }

  updateModules(id: number, modules: Modules): Observable<Modules> {
    return this.http.put<Modules>(`${this.baseUrl}/updateMD/${id}`, modules);
  }
  getModuleStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistics`);
  }

}
