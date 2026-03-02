import { Component, EventEmitter, Output, inject, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

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
            if (this.searchInput) {
                this.searchInput.nativeElement.focus();
            }
        }, 100);
    }

    onSearch(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.query.set(value);

        if (value.trim()) {
            this.productService.searchProducts(value).subscribe(data => {
                this.results.set(data);
            });
        } else {
            this.results.set([]);
        }
    }

    close() {
        this.closeSearch.emit();
    }
}
