import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService, Message } from '../../chat.service';
import { BookService } from '../../books.service';
 // Assurez-vous d'importer BookService

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.css']
})
export class ExchangeFormComponent implements OnInit {
  phoneNumber: string = '';
  bookId: number | null = null;
  showChat: boolean = false;
  newMessage: string = '';
  messages: Observable<Message[]>;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private bookService: BookService  // Injectez BookService ici
  ) {
    this.messages = this.chatService.messages$;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      console.log(this.bookId)
      console.log(this.phoneNumber)
    });
  }
onSubmit(): void {
  // Ici, vous pouvez ajouter toute logique supplémentaire nécessaire avant d'appeler votre API.
  if (this.bookId && this.phoneNumber) {
    // Validation côté client (en option)
    if (!/^[0-9]{8}$/.test(this.phoneNumber)) {
      alert('Invalid phone number. The phone number must contain 8 digits.');
      return; // Stop further execution if the phone number is invalid
    }

    // Si la validation est passée, continuez avec l'appel API.
    this.bookService.updatePhoneNumber(this.bookId, this.phoneNumber).subscribe({
      next: (response) => {
        console.log('Phone number updated successfully', response);
        // Vous pourriez vouloir utiliser un meilleur système de notification que alert().
        alert('Phone number updated successfully');
        this.phoneNumber = ''; // Réinitialisez le champ après la mise à jour
      },
      error: (error) => {
        console.error('Failed to update phone number', error);
        // Même chose ici pour la gestion des erreurs.
        alert('Failed to update phone number');
      }
    });
  } else {
    // Vous pourriez vouloir mieux gérer cette erreur.
    alert(' Phone Number is missing!');
  }
}

  

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage('Username', this.newMessage);
      this.newMessage = '';
    }
  }
  //controle de saisie pour le phone number 
  onInput(event: any): void {
    const inputChar = event.data;
    if (inputChar && isNaN(inputChar)) {
      event.target.value = event.target.value.replace(/[^\d]/, ''); // Remplacer tout caractère non numérique par une chaîne vide
      this.phoneNumber = event.target.value; // Mettre à jour la valeur du numéro de téléphone dans le modèle
    }
  }
  
  
 
  
}
