import { Component } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    showPassword = false;

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
}
