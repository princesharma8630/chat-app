import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile-setup',
  imports: [CommonModule , ReactiveFormsModule, FormsModule],
  templateUrl: './profile-setup.html',
  styleUrl: './profile-setup.scss'
})
export class ProfileSetup {
   displayName = '';
  selectedFile: File | null = null;

  constructor(private authService: AuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('📷 File selected:', this.selectedFile);
  }

  async saveProfile() {
    try {
      await this.authService.updateProfile(this.displayName, this.selectedFile);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('❌ Error updating profile:', err);
    }
  }

}
