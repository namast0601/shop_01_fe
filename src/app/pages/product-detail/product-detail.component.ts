import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService, Product } from '../../services/cart.service';
import { ToastService } from '../../components/toast/toast.component';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private cartService = inject(CartService);
    private toastService = inject(ToastService);

    product: any = {};
    quantity = 1;
    activeImage = '';
    activeTab = 'details';

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = Number(params['id']);
            this.loadProduct(id);
        });
    }

    loadProduct(id: number) {
        // Mock Data Lookup (matching the list page + more details)
        this.product = {
            id: id,
            name: `Trầm Hương Loại ${id}`,
            price: id * 500000 + 500000,
            type: id % 2 === 0 ? 'Nha Trang' : 'Quảng Nam',
            description: 'Được khai thác từ những cây dó bầu hàng chục năm tuổi tại rừng già. Hương thơm ngọt dịu, sâu lắng, giúp tĩnh tâm, an thần. Sản phẩm được chế tác hoàn toàn thủ công bởi các nghệ nhân lành nghề.',
            images: [
                'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG',
                'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG',
                'https://thienlocviet.vn/uploads/products/Huong%20tram%20Cao%20cap%2030cm.JPG'
            ]
        };
        this.activeImage = this.product.images[0];

        // Reset state
        this.quantity = 1;
        window.scrollTo(0, 0);
    }

    addToCart() {
        // Add multiple items loop
        for (let i = 0; i < this.quantity; i++) {
            this.cartService.addToCart(this.product);
        }
        this.toastService.show(`Đã thêm ${this.quantity} sản phẩm vào giỏ`);
    }

    toggleTab(tab: string) {
        this.activeTab = (this.activeTab === tab) ? '' : tab;
    }
}
