import { Injectable, signal } from '@angular/core';
import { Product } from './cart.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // Centralized product data
    private productsSignal = signal<Product[]>(Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Trầm Hương Loại ${i + 1}`,
        price: (i + 1) * 500000 + 500000,
        image: 'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG',
        type: i % 2 === 0 ? 'Nha Trang' : 'Quảng Nam'
    })));

    get products() {
        return this.productsSignal.asReadonly();
    }

    searchProducts(query: string): Product[] {
        const q = query.toLowerCase().trim();
        if (!q) return [];
        return this.productsSignal().filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.type && p.type.toLowerCase().includes(q))
        );
    }
}
