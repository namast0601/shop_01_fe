import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ToastService } from '../../components/toast/toast.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private toastService = inject(ToastService);
    private router = inject(Router);

    onSubmit(event: Event) {
        event.preventDefault();
        this.toastService.show('Đăng ký thành công!');
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 1000);
    }
}
