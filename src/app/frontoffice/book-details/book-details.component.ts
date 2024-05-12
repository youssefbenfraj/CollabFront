import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../../book-details.service';
import { Exchange } from '../../../models/book-details.model';
import { Router } from '@angular/router';
import { State } from '../../../models/state.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  exchanges: Exchange[] = [];
  newExchange: Exchange = {} as Exchange;

  selectedExchanges: Exchange | null = null;
  fileToUpload: File | null = null;

  // For add form, assuming these are all the fields in your Book model

  constructor(private bookdetailService: BookDetailsService , private router: Router) { }

  ngOnInit(): void {
    this.getAllExchanges();
  }

  
  getAllExchanges(): void {
    this.bookdetailService.getAllEX().subscribe(exchanges => {
      this.exchanges = exchanges;
    });
  }
  addBook1(): void {
    this.bookdetailService.addExchange(this.newExchange).subscribe(newBook => {
      
      this.exchanges.push(this.newExchange);
      this.newExchange = {} as Exchange; // Réinitialise le formulaire
      
       
    });
    
  }
  addExchange(): void {
    this.bookdetailService.addExchange(this.newExchange).subscribe({
      next: (Exchange) => {
        this.exchanges.push(Exchange); // Ajoutez le livre retourné par le serveur si différent de newBook
        this.newExchange = {} as Exchange; // Réinitialise le formulaire
        this.router.navigate(['/getallbooks']); // Redirection vers '/getallbooks'
      },
      error: (error) => {
        // Gérez l'erreur ici
        console.error('An error occurred while adding the book', error);
      }
    });
  }
 
   

  

  updateExchages(exchange: Exchange): void {
    this.bookdetailService.updateExchange(exchange.idExch, exchange).subscribe(updatedBooks => {
      const index = this.exchanges.findIndex(b => b.idExch === updatedBooks.idExch);
      if (index !== -1) {
        this.exchanges[index] = updatedBooks;
        this.selectedExchanges = null; // Cache le formulaire après la mise à jour
      }
    });
  }
  selectExchange(exchanges: Exchange): void {
    this.selectedExchanges = exchanges;
  }

  deleteBook(id: number): void {
    this.bookdetailService.deleteExchange(id).subscribe({
      next: () => {
        this.exchanges = this.exchanges.filter(exchange => exchange.idExch !== id);
        console.log('Book deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting book:', error);
      }
    });
  }
  onFileSelect(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }
  isBookTreate(exchange: Exchange): boolean {
    return exchange.state === State.ACCEPTED;}
  
}



