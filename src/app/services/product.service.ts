import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './cart.service';
import { API_CONFIG } from '../config/api.config';
import { catchError, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);

    // Initialize with empty array, data will be loaded from API
    private productsSignal = signal<Product[]>([]);

    // Fallback mock data in case API is not ready/fails
    private mockData: Product[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Trầm Hương Loại ${i + 1}`,
        price: (i + 1) * 500000 + 500000,
        image: 'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG',
        type: i % 2 === 0 ? 'Nha Trang' : 'Quảng Nam'
    }));

    constructor() {
        this.fetchProducts();
    }

    get products() {
        return this.productsSignal.asReadonly();
    }

    fetchProducts() {
        const apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.products}`;

        this.http.get<Product[]>(apiUrl).pipe(
            catchError(error => {
                console.warn('API connection failed (expected if no backend). Using mock data for demo.', error);
                return of(this.mockData);
            })
        ).subscribe(data => {
            this.productsSignal.set(data);
        });
    }

    searchProducts(query: string): Product[] {
        const q = query.toLowerCase().trim();
        if (!q) return [];
        // Currently searching in local state. 
        // If API supports search, this should return an Observable or be handled via API call.
        // For now, filtering the loaded products is efficient for small datasets.
        return this.productsSignal().filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.type && p.type.toLowerCase().includes(q))
        );
    }

    getProductById(id: number) {
        // Helper to get from local state, or fetch individual API
        return this.productsSignal().find(p => p.id === id);
    }
}
