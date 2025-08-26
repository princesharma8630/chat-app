import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
@Component({
  selector: 'app-signup',
  imports: [CommonModule , ReactiveFormsModule , FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
 email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSignUp() {
    this.authService.signUp(this.email, this.password);
}
} 