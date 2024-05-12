// cart-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PaymentService } from '../../../services/payment.service';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../models/Document.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent {
  items: Document[] = [];
  returnedString!: string;
  doc!:Document;
  userData:any;
  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,private paymentService:PaymentService,private docService:DocumentService,
    @Inject(MAT_DIALOG_DATA) public data: { items: Document[] },
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.items = items;
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  removeFromCart(item: Document): void {
    this.cartService.removeItem(item.idDoc);
  }

  proceedToCheckout(id:any): void {
    console.log(id);
    this.docService.retrieveById(id).subscribe((response:Document)=>{
      this.doc=response;
      const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
            this.userData = JSON.parse(storedUserData);
       }
            console.log(this.userData);
            const userId = this.userData.idUser;
            console.log(userId);
      console.log(this.doc);
      this.paymentService.proc22(this.doc,userId).subscribe(
        (response: string) => {
          console.log("aaa");
          console.log('Returned string:', response); // Log the returned string here
          this.returnedString = response;
        },
        (error) => {
          console.error('Error fetching string from Spring:', error);
        }
      );
    });
    
    this.dialogRef.close('proceed_to_checkout');
  }
}
