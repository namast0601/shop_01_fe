import { Component, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ToastMessage {
  text: string;
  type: 'success' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  show(text: string, type: 'success' | 'info' = 'success') {
    const id = this.counter++;
    this.toasts.update(current => [...current, { text, type, id }]);

    setTimeout(() => {
      this.toasts.update(current => current.filter(t => t.id !== id));
    }, 3000); // 3 seconds
  }
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-item glass-panel fade-in-up" [class]="toast.type">
          <span class="material-icons info-icon">{{ toast.type === 'success' ? 'check_circle' : 'info' }}</span>
          <span>{{ toast.text }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .toast-item {
      background: rgba(10, 8, 6, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(198, 168, 124, 0.2);
      color: #e0e0e0;
      padding: 12px 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      min-width: 250px;
      font-size: 0.9rem;
    }
    
    .toast-item.success {
      border-left: 3px solid var(--c-gold);
    }
    
    .info-icon {
      color: var(--c-gold);
      font-size: 20px;
    }
    
    .fade-in-up {
      animation: fadeInUp 0.4s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }
}
