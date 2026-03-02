import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * RE-DESIGN: Sử dụng signals để quản lý trạng thái giỏ hàng hiệu năng cao.
   * Để ghép API: 
   * 1. Có thể thêm một constructor gọi API lấy giỏ hàng nếu muốn lưu server.
   * 2. Gọi API trong addToCart, updateQuantity nếu cần đồng bộ server ngay lập tức.
   */

  cartItems = signal<CartItem[]>([]);

  // Các computed signals tự động cập nhật khi cartItems thay đổi
  cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  cartTotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  /**
   * Thêm sản phẩm vào giỏ hàng. 
   * Hướng dẫn ghép API: Nếu muốn đồng bộ, hãy gọi POST /api/cart tại đây.
   */
  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...product, quantity: 1 }];
    });

    // logic lưu vào localStorage (placeholder)
    this.saveToLocal();
  }

  /**
   * Xóa sản phẩm khỏi giỏ hàng. 
   * Hướng dẫn ghép API: Gọi DELETE /api/cart/{id}
   */
  removeFromCart(id: number) {
    this.cartItems.update(items => items.filter(i => i.id !== id));
    this.saveToLocal();
  }

  /**
   * Cập nhật số lượng. 
   * Hướng dẫn ghép API: Gọi PUT /api/cart/{id}
   */
  updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    this.cartItems.update(items =>
      items.map(i => i.id === id ? { ...i, quantity } : i)
    );
    this.saveToLocal();
  }

  /**
   * Xóa sạch giỏ hàng. 
   * Hướng dẫn ghép API: Gọi DELETE /api/cart
   */
  clearCart() {
    this.cartItems.set([]);
    this.saveToLocal();
  }

  // Placeholder cho logic lưu trữ local hoặc đồng bộ api
  private saveToLocal() {
    // localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
}
