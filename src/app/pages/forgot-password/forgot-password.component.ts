import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ToastService } from '../../components/toast/toast.component';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
    private toastService = inject(ToastService);
    private router = inject(Router);

    onSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;

        if (!email) {
            this.toastService.show('Vui lòng nhập email!');
            return;
        }

        // Simulate API call
        setTimeout(() => {
            this.toastService.show('Đã gửi liên kết! Vui lòng kiểm tra email.');
            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 2000);
        }, 500);
    }
}
