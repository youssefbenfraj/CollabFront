import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  user: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor() {}

  sendMessage(user: string, content: string): void {
    const newMessage: Message = {
      user,
      content,
      timestamp: new Date()
    };
    // Ajoute le nouveau message au tableau existant de messages
    this.messagesSubject.next([...this.messagesSubject.value, newMessage]);
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
  }
}
