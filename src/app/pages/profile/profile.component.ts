import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../components/toast/toast.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
    private toastService = inject(ToastService);
    activeTab: 'info' | 'orders' | 'address' | 'password' = 'info';

    changePassword(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const currentPass = (form.elements.namedItem('currentPass') as HTMLInputElement).value;
        const newPass = (form.elements.namedItem('newPass') as HTMLInputElement).value;
        const confirmPass = (form.elements.namedItem('confirmPass') as HTMLInputElement).value;

        // Simple validation demo
        if (!currentPass || !newPass || !confirmPass) {
            this.toastService.show('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        if (newPass !== confirmPass) {
            this.toastService.show('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (newPass.length < 6) {
            this.toastService.show('Mật khẩu mới phải từ 6 ký tự!');
            return;
        }

        // Simulate API call success
        setTimeout(() => {
            this.toastService.show('Đổi mật khẩu thành công!');
            form.reset();
        }, 500);
    }
}
