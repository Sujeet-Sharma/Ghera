import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  user = {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    joinDate: 'January 2024',
    address: {
      street: '123 Fashion Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    }
  };

  isEditing = false;
  editForm = { ...this.user };

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editForm = { ...this.user };
    }
  }

  saveProfile() {
    this.user = { ...this.editForm };
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}