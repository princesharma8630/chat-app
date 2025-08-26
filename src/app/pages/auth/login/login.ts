import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
 email = '';
  password = '';

  constructor(private authService: AuthService) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Login successful!');
    } catch (err) {
      console.error('❌ Login error:', err);
    }
  }
}
