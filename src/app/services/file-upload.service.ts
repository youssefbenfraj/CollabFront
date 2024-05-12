import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:8087/files/upload';
  private baseUrl = 'http://localhost:8087/files/listfiles'; 

  constructor(private http: HttpClient) { }

  uploadFiles(idDoc: number, files: File[]) {
    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }
    return this.http.post<any>(`${this.apiUrl}/${idDoc}`, formData);
  }
  listFiles(documentId: number) {
    return this.http.get<string[]>(`${this.baseUrl}/${documentId}`);
  }
}
