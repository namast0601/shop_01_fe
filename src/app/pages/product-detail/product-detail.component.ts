import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
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
    private productService = inject(ProductService);
    private toastService = inject(ToastService);

    product: any = {};
    quantity = 1;
    activeImage = '';
    openTabs = new Set<string>(['details']);

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = Number(params['id']);
            this.loadProduct(id);
        });
    }

    loadProduct(id: number) {
        this.productService.getProductById(id).subscribe(product => {
            if (product) {
                this.product = {
                    ...product,
                    // If backend doesn't provide images array, use single image
                    images: (product as any).images || [product.image]
                };
                this.activeImage = this.product.images[0];
            }
        });

        // Reset state
        this.quantity = 1;
        window.scrollTo(0, 0);
    }

    addToCart() {
        this.cartService.addToCart(this.product);
        this.toastService.show(`Đã thêm ${this.quantity} sản phẩm vào giỏ`);
    }

    toggleTab(tab: string) {
        if (this.openTabs.has(tab)) {
            this.openTabs.delete(tab);
        } else {
            this.openTabs.add(tab);
        }
    }
}
