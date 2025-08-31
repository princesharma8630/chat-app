import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../../core/services/profileservice/profile';


@Component({
  selector: 'app-profile-setup',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './profile-setup.html',
  styleUrls: ['./profile-setup.scss']
})
export class ProfileSetup {
  displayName = '';
  selectedFile: File | null = null;

  constructor(private profileService: ProfileService, private routes: Router) {}

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('📷 File selected:', this.selectedFile);
    }
  }

  async saveProfile() {
    if (!this.displayName.trim()) {
      this.routes.navigate(['/chat']);
      return;
    }
    try {
      // ✅ Using ProfileService instead of AuthService
      await this.profileService.saveProfile(this.displayName, this.selectedFile);
      alert('Profile updated successfully!');
      this.routes.navigate(['/chat']); // ya dashboard, as per your flow
    } catch (err) {
      console.error('❌ Error updating profile:', err);
    }
  }
}
