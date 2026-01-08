import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // using signals for reactive state
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  cartTotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...product, quantity: 1 }];
    });
  }

  removeFromCart(id: number) {
    this.cartItems.update(items => items.filter(i => i.id !== id));
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    this.cartItems.update(items =>
      items.map(i => i.id === id ? { ...i, quantity } : i)
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
