import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.model';
import { API_CONFIG } from '../config/api.config';
import { catchError, finalize, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);

    // QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)
    private productsSignal = signal<Product[]>([]);
    private loadingSignal = signal<boolean>(false);
    private errorSignal = signal<string | null>(null);

    // MOCK DATA: Dùng để demo khi chưa có API thật
    private mockData: Product[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Trầm Hương Loại ${i + 1}`,
        price: (i + 1) * 500000 + 500000,
        image: 'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG',
        type: i % 2 === 0 ? 'Nha Trang' : 'Quảng Nam',
        description: 'Sản phẩm trầm hương tự nhiên cao cấp, mùi thơm thanh khiết.'
    }));

    constructor() {
        this.fetchProducts();
    }

    // EXPOSE SIGNALS: Cho phép components đọc dữ liệu theo cách reactive
    get products() { return this.productsSignal.asReadonly(); }
    get isLoading() { return this.loadingSignal.asReadonly(); }
    get error() { return this.errorSignal.asReadonly(); }

    /**
     * HƯỚNG DẪN GHÉP API - Lấy danh sách sản phẩm
     * 1. Đảm bảo backend trả về mảng Product[] (json).
     * 2. Nếu API có phân trang, hãy thay đổi tham số truyền vào (page, limit).
     */
    fetchProducts() {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.products}`;

        // Bước 1: Gọi API qua HttpClient
        this.http.get<Product[]>(apiUrl).pipe(
            // Bước 2: Xử lý lỗi nếu API không hoạt động
            catchError((error: HttpErrorResponse) => {
                console.warn('LỖI KẾT NỐI API: Đang sử dụng dữ liệu Mock để mô phỏng.', error.message);
                this.errorSignal.set('Không thể kết nối đến máy chủ. Đang hiển thị dữ liệu mẫu.');
                return of(this.mockData);
            }),
            // Bước 3: Hoàn tất việc loading
            finalize(() => this.loadingSignal.set(false))
        ).subscribe(data => {
            // Bước 4: Cập nhật state (signal)
            this.productsSignal.set(data);
        });
    }

    /**
     * HƯỚNG DẪN GHÉP API - Lấy chi tiết sản phẩm
     * @param id của sản phẩm cần lấy
     * Hiện tại đang dùng dữ liệu local. Khi có API, hãy dùng: 
     * return this.http.get<Product>(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.productDetail}${id}`);
     */
    getProductById(id: number) {
        // Tìm trong state hiện tại
        const product = this.productsSignal().find(p => p.id === id);
        if (product) return of(product);

        // Nếu không thấy trong state, gọi API lấy chi tiết (mô phỏng)
        return of(this.mockData.find(p => p.id === id));
    }

    /**
     * HƯỚNG DẪN GHÉP API - Tìm kiếm
     * 1. Query trực tiếp trên API: GET /products?q=keyword
     */
    searchProducts(query: string) {
        const q = query.toLowerCase().trim();
        if (!q) return of([]);

        // MÔ PHỎNG: Tìm kiếm trên local
        const filtered = this.productsSignal().filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.type && p.type.toLowerCase().includes(q))
        );
        return of(filtered);
    }
}
