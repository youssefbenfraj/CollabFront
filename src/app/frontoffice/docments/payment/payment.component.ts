import { Component } from '@angular/core';
import { StripeService } from '../../../services/stripe.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-payment',
  template: `
    <button (click)="processPayment()">Pay with Stripe</button>
  `
})
export class PaymentComponent {
  constructor(private cartService: CartService, private stripeService: StripeService) {}

  processPayment() {
    this.cartService.items$.subscribe(items => {
      if (items.length > 0) {
        this.stripeService.createCheckoutSession(items).subscribe(session => {
          window.location.href = session.url; // Redirection to Stripe Checkout
        });
      }
    });
  }
}
