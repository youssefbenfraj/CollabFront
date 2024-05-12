import { Component, OnInit } from '@angular/core';
import { BookService } from '../../books.service';
import { Book } from '../../../models/books.model';
import { UpdateBookDialogComponent } from '../../update-book-dialog/update-book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-get-all-books',
  templateUrl: './get-all-books.component.html',
  styleUrl: './get-all-books.component.css'
})
export class GetAllBooksComponent implements OnInit {
  books: Book[] = [];
  userId: number=0;
  userData: any;
  selectedBooks: Book | null = null;
  qrCodeData: { [key: number]: string } = {}; // Un dictionnaire pour stocker les données QR par ID de livre
  filteredBooks: Book[] = [];
  searchText: string = '';
  mostLikedBook: Book | null = null;
  currentUser: { id: number } | null = null;  


  constructor(private bookService: BookService  , public dialog: MatDialog,    private auth: AuthService ) { }


  ngOnInit(): void {
    this.getAllBooks();
    this.filterBooks();
    this.getMostLikedBook();

    this.getCurrentUser();    
   
    
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
        console.log("Books received: ", books); // Pour voir les données reçues
        this.books = books;
        this.filteredBooks = [...this.books]; // Faites une copie des livres pour initialiser filteredBooks
        books.forEach(book => {
             this.qrCodeData[book.idBook] = this.bookService.getQrCodeData(book.idBook);
        });
    }, error => {
        console.error("Failed to fetch books: ", error); // Afficher les erreurs si la requête échoue
    });
}

  
  openDialog(book: Book): void {
    const dialogRef = this.dialog.open(UpdateBookDialogComponent, {
      width: '300px',
      data: { book: {...book} }  // Clone the book object to avoid direct modification
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBooks(result);
      }
    });
  }

  updateBooks(book: Book): void {
    this.bookService.updateBook(book.idBook, book).subscribe(
      updatedBook => {
        const index = this.books.findIndex(b => b.idBook === updatedBook.idBook);
        if (index !== -1) {
          this.books[index] = updatedBook;  // Update the local array to reflect the changes
          this.filterBooks(); // Reapply filters to update the filteredBooks array
        }
      },
      error => {
        console.error('Failed to update book:', error);
      }
    );
  }
  

  selectBooks(books: Book): void {
    this.selectedBooks = books;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        console.log('Book deleted successfully from backend');
        this.books = this.books.filter(book => book.idBook !== id);
        this.filterBooks(); // Update filtered books if any filters are applied
        console.log('Frontend state updated, book removed');
      },
      error: (error) => {
        console.error('Error deleting book:', error);
      }
    });
  }
  
  filterBooks(): void {
    if (!this.searchText) {
      this.filteredBooks = [...this.books];  // Utilisez spread pour forcer la mise à jour du binding
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.titleBook.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  

  likeBook(bookId: number): void {
    this.bookService.addLike(bookId,this.userId).subscribe(updatedBook => {
      const index = this.books.findIndex(book => book.idBook === updatedBook.idBook);
      if (index !== -1) {
        this.books[index].likes = updatedBook.likes;  // Ensure that likes are updated correctly
        this.filterBooks();  // Update the filteredBooks view if search/filter is active
      }
    }, error => {
      console.error('Failed to like the book:', error);
    });
  }
  
  dislikeBook(bookId: number,): void {
    this.bookService.addDislike(bookId,this.userId).subscribe(updatedBook => {
      const index = this.books.findIndex(book => book.idBook === updatedBook.idBook);
      if (index !== -1) {
        this.books[index].dislikes = updatedBook.dislikes;  // Ensure that dislikes are updated correctly
        this.filterBooks();  // Update the filteredBooks view if search/filter is active
      }
    }, error => {
      console.error('Error disliking the book:', error);
    });
  }
  

getMostLikedBook(): void {
  this.bookService.getMostLikedBook().subscribe(book => {
    this.mostLikedBook = book;
  }, error => {
    console.error("Failed to fetch most liked book: ", error);
  });
}


}

  
