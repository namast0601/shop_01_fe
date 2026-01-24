import { Component, EventEmitter, Output, inject, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/cart.service';

@Component({
    selector: 'app-search-overlay',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './search-overlay.component.html',
    styleUrl: './search-overlay.component.css'
})
export class SearchOverlayComponent implements AfterViewInit {
    @Output() closeSearch = new EventEmitter<void>();
    @ViewChild('searchInput') searchInput!: ElementRef;

    private productService = inject(ProductService);

    query = signal('');
    results = signal<Product[]>([]);

    ngAfterViewInit() {
        // Auto-focus input
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    onSearch(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.query.set(value);

        if (value.trim()) {
            this.results.set(this.productService.searchProducts(value));
        } else {
            this.results.set([]);
        }
    }

    close() {
        this.closeSearch.emit();
    }
}
