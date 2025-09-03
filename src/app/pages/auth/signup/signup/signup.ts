import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [CommonModule , ReactiveFormsModule , FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
 email: string = '';
  password: string = '';

  constructor(private authService: AuthService , private route :Router) {}

  onSignUp() {
    this.authService.signUp(this.email, this.password);
     alert("Account created successfully! Please log in.");
    this.route.navigate(['/login']);

}
} 