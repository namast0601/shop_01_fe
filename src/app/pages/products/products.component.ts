import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../../services/cart.service';
import { ToastService } from '../../components/toast/toast.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  // Mock Products
  allProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Trầm Hương Loại ${i + 1}`,
    price: (i + 1) * 500000 + 500000,
    image: 'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG',
    type: i % 2 === 0 ? 'Nha Trang' : 'Quảng Nam'
  }));

  // Filter State
  products = this.allProducts;
  categories = ['Tất cả', 'Nha Trang', 'Quảng Nam', 'Trầm Hương Đốt', 'Vòng Tay Trầm'];
  selectedCategory = 'Tất cả';
  maxPrice = 10000000;
  priceFilter = 10000000;

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
    this.selectedCategory = category;
    this.applyFilters();
  }

  updatePrice(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.priceFilter = Number(value);
    this.applyFilters();
  }

  applyFilters() {
    this.products = this.allProducts.filter(p => {
      const matchCat = this.selectedCategory === 'Tất cả' ||
        (this.selectedCategory === 'Nha Trang' && p.type === 'Nha Trang') ||
        (this.selectedCategory === 'Quảng Nam' && p.type === 'Quảng Nam') ||
        (this.selectedCategory !== 'Nha Trang' && this.selectedCategory !== 'Quảng Nam'); // Mock fallback
      const matchPrice = p.price <= this.priceFilter;
      return matchCat && matchPrice;
    });
  }
}
