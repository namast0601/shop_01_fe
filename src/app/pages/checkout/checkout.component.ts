import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartService = inject(CartService);

  // Mock data for summary removed, use service
  items = this.cartService.cartItems;
  subtotal = this.cartService.cartTotal;
  shipping = 0;

  // Total computed from subtotal + shipping (could be a computed signal in component if needed, but simple getter works for now)
  get total(): number {
    return this.subtotal() + this.shipping;
  }

  paymentMethod = 'cod'; // Default payment method
  orderSuccess = false;
  isProcessing = false;

  selectPayment(method: string) {
    this.paymentMethod = method;
  }

  placeOrder() {
    this.isProcessing = true;

    // Simulate API call
    setTimeout(() => {
      this.isProcessing = false;
      this.orderSuccess = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }
}
