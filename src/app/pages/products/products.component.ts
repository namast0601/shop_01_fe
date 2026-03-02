import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ToastService } from '../../components/toast/toast.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private cartService = inject(CartService);
  private toastService = inject(ToastService);
  private productService = inject(ProductService);

  // States from service
  isLoading = this.productService.isLoading;
  error = this.productService.error;

  // Filter State
  categories = ['Tất cả', 'Nha Trang', 'Quảng Nam', 'Trầm Hương Đốt', 'Vòng Tay Trầm'];
  selectedCategory = signal('Tất cả');
  priceFilterBoundary = 10000000;
  priceFilter = signal(10000000);

  // Reactive Filtered Products
  products = computed(() => {
    const all = this.productService.products();
    const category = this.selectedCategory();
    const price = this.priceFilter();

    return all.filter(p => {
      const matchCat = category === 'Tất cả' || p.type === category;
      const matchPrice = p.price <= price;
      return matchCat && matchPrice;
    });
  });

  // Feedback state
  addedItems = new Set<number>();

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastService.show(`Đã thêm "${product.name}" vào giỏ hàng`);

    this.addedItems.add(product.id);
    setTimeout(() => {
      this.addedItems.delete(product.id);
    }, 2000);
  }

  filterCategory(category: string) {
    this.selectedCategory.set(category);
  }

  updatePrice(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.priceFilter.set(Number(value));
  }
}
