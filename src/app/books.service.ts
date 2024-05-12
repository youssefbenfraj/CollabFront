import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/books.model';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient,private authService: AuthService) { }

  addBook(bookData: any , userId: number): Observable<any> {
   

    return this.http.post<Book>(`${this.baseUrl}/addBook`,bookData);
}






  
  getBookById(id: number): Observable<Book> {
   
    return this.http.get<Book>(`${this.baseUrl}/getBookById/${id}`);
  }

  getAllBK(): Observable<Book[]> {
    
    return this.http.get<Book[]>(`${this.baseUrl}/getAllBK`); 
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteBK/${id}`);
  }
  

  updateBook(id: number, book: Book): Observable<Book> {
    
    return this.http.put<Book>(`${this.baseUrl}/updateBK/${id}`, book);
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>('votre_endpoint_backend_pour_upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
getQrCodeData1(book: Book): string {
  // Format des détails du livre pour un affichage texte simple
   const bookDetails = `Détails du livre:
TITLE: ${book.titleBook}
DESCIPTION: ${book.description}
LANGUAGE: ${book.language}
AVAILIBILITY: ${book.isAvailable }`;

  return bookDetails;
  
}

getQrCodeData(bookId: number): string {
  return `http:/172.20.10.3:4200/exchange-form/${bookId}`;
}

updatePhoneNumber(bookId: number, phoneNumber: string): Observable<any> {
  const url = `${this.baseUrl}/updateBook/${bookId}`;
  return this.http.put(url, { phoneNumber });
}


addLike(bookId: number,userId: number): Observable<Book> {
 // Ensure this method actually fetches the current user ID correctly
  return this.http.post<Book>(`${this.baseUrl}/like/${bookId}/${userId}`, {});
}

addDislike(bookId: number,userId: number): Observable<Book> {
 // Same as above
  return this.http.post<Book>(`${this.baseUrl}/dislike/${bookId}/${userId}`, {});
}

getMostLikedBook(): Observable<Book> {
  return this.getAllBK().pipe(
    map(books => books.reduce((max, book) => max.likes > book.likes ? max : book, books[0]))
  );
}


}








  
  


