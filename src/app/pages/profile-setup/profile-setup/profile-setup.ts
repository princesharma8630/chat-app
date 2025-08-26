import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-setup',
  imports: [CommonModule , ReactiveFormsModule, FormsModule , RouterModule],
  templateUrl: './profile-setup.html',
  styleUrl: './profile-setup.scss'
})
export class ProfileSetup {
   displayName = '';
  selectedFile: File | null = null;

  constructor(private authService: AuthService , private routes:Router) {}

  onFileSelected(event: any) {
   const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('📷 File selected:', this.selectedFile);
    }
  }

  async saveProfile() {
    try {
      await this.authService.updateProfile(this.displayName, this.selectedFile);
      alert('Profile updated successfully!');
      this.routes.navigate(['/chat']);
    } catch (err) {
      console.error('❌ Error updating profile:', err);
    }
  }

}
