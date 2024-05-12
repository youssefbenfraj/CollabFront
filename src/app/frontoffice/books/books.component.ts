import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/books.model'; 
import { BookService } from '../../books.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IsAvailable } from '../../../models/IsAvailable.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = {
    idBook: 0, // Initialiser avec un id par défaut ou laisser vide si géré côté serveur
    titleBook: '',
    description: '',
    language: '',
    coverPicture: '',
    isAvailable: IsAvailable.AVAILABLE, // Initialisé sur 'Indisponible'
    phoneNumber: '',
    likes:0,
    dislikes:0,
  
  };
  userData: any;

  selectedBooks: Book | null = null;
  fileToUpload: File | null = null;
  userId?: number;
  currentUser: { id: number } | null = null;  
    selectFile: File | null = null;
 



  constructor(private bookService: BookService, private router: Router, private toastr: ToastrService,    private auth: AuthService // Assuming AuthService provides user info
) { }



ngOnInit(): void {
this.getCurrentUser();
  this.getAllBooks();
}
getCurrentUser(): void {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('current user:', this.userData);
      
      if ('idUser' in this.userData) {
         this. userId = this.userData.idUser; // Extracting idUser from userData
          console.log('User ID:', this.userId);
          // Assigning idUser to currentUser.id
          // this.currentUser = { id:this. userId }; // assuming currentUser is of type User
      } else {
          console.log('No user ID found in userData');
      }
  } else {
      console.log('No user data found in localStorage');
  }
}
  getAllBooks(): void {
    this.bookService.getAllBK().subscribe(books => {
      this.books = books;
    });
  }
  addBook(): void {
    if (!this.userId) {
      this.toastr.error('User must be logged in to add a book');
      return;
    }

    const formData = new FormData();
    formData.append('titleBook', this.newBook.titleBook);
    formData.append('description', this.newBook.description);
    formData.append('language', this.newBook.language);
    formData.append('likes', String(0));
    formData.append(' dislikes', String(0));
    if (this.selectFile) {
      formData.append('imageFile', this.selectFile, this.selectFile.name);
    } else {
      this.toastr.error('Cover picture must be uploaded');
      return;
    }
    formData.append('isAvailable', this.newBook.isAvailable);
    formData.append('phoneNumber', this.newBook.phoneNumber);
    // formData.append('likes', String(this.newBook.likes));
    // formData.append('dislikes', String(this.newBook.dislikes));
    formData.append('userId', this.userId.toString());
    console.log(this.newBook)
    console.log(formData)
    this.bookService.addBook(formData, this.userId).subscribe({
      next: (book) => {
        this.books.push(book);
        this.resetNewBook();
        this.toastr.success('Book added successfully!', 'Success');
      },
      error: (error) => {
        console.log(this.newBook)
        console.error('Error adding book:', error);
        this.toastr.error(`Failed to add book: ${error.error.message || 'Unknown error'}`, 'Error');
      }
    });
}

  
 
  resetNewBook(): void {
    this.newBook = {
      idBook: 0,
      titleBook: '',
      description: '',
      language: '',
      coverPicture: '',
      isAvailable: IsAvailable.NOTAVAILABLE ,// Gardez le statut initial sur 'Indisponible'
      phoneNumber: '',
      likes:0,
      dislikes:0,
  


    };
  }

  updateBooks(book: Book): void {
    this.bookService.updateBook(book.idBook, book).subscribe(updatedBook => {
      const index = this.books.findIndex(b => b.idBook === updatedBook.idBook);
      if (index !== -1) {
        this.books[index] = updatedBook;
        this.toastr.success('Mise à jour avec succès!', 'Le livre a été mis à jour!');
      }
    }, error => {
      console.error('Failed to update book:', error);
      this.toastr.error('Erreur lors de la mise à jour du livre', 'Une erreur est survenue!');
    });
  }

  selectBooks(book: Book): void {
    this.selectedBooks = book;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.idBook !== id);
        this.toastr.success('Suppression réussie!', 'Le livre a été supprimé!');
      },
      error: (error) => {
        console.error('Error deleting book:', error);
        this.toastr.error('Erreur lors de la suppression du livre', 'Une erreur est survenue!');
      }
    });
  }

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    this.selectFile = file;
  }
  
 
}
 