import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor(private router: Router) { }

    onSubmit(event: Event) {
        event.preventDefault();
        // Simulate login success
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 500);
    }
}
