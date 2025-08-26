import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule , RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
 email = '';
  password = '';

  constructor(private authService: AuthService , private router:Router) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Login successful!');
       this.router.navigate(['/chat']);
    } catch (err) {
      console.error('❌ Login error:', err);
    }
  }
}
