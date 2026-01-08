import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('scroller') scroller!: ElementRef<HTMLDivElement>;

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
