import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../../services/cart.service';
import { ToastService } from '../../components/toast/toast.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('scroller') scroller!: ElementRef<HTMLDivElement>;

  // Inject services
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  addedItems = new Set<number>();

  addToCart(item: number) {
    const product: Product = {
      id: item,
      name: `Trầm Hương Loại ${item}`,
      price: 1000000 * item,
      image: 'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG',
      type: 'Nha Trang, Việt Nam'
    };

    this.cartService.addToCart(product);
    this.toastService.show(`Đã thêm "${product.name}" vào giỏ hàng`);

    // Show feedback
    this.addedItems.add(item);
    setTimeout(() => {
      this.addedItems.delete(item);
    }, 2000);
  }

  scrollLeft() {
    this.scrollByItem(-1);
  }

  scrollRight() {
    this.scrollByItem(1);
  }

  private scrollByItem(direction: number) {
    const container = this.scroller.nativeElement;
    // Get the first product item width
    const item = container.firstElementChild as HTMLElement;
    if (!item) return;

    // Calculate total width including gap
    const style = window.getComputedStyle(container);
    const gap = parseInt(style.gap || '0', 10);
    const scrollAmount = (item.offsetWidth + gap) * direction;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
