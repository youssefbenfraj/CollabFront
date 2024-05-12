import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document } from '../models/Document.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<Document[]>([]);
  items$ = this.itemsSubject.asObservable();

  addItem(item: Document) {
    const currentItems = this.itemsSubject.value;
    const items = [...currentItems, item];
    this.itemsSubject.next(items);
  }

  removeItem(id: number) {
    const currentItems = this.itemsSubject.value;
    const items = currentItems.filter(item => item.idDoc !== id);
    this.itemsSubject.next(items);
  }

  clearCart() {
    this.itemsSubject.next([]);
  }

  getItems(): Document[] {
    return this.itemsSubject.value;
  }
}
