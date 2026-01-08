import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
  total = this.cartService.cartTotal;

  updateQuantity(item: CartItem, change: number) {
    this.cartService.updateQuantity(item.id, item.quantity + change);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }
}
