import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { IUserRes } from '../../Models/iuserRes';
import { IUser } from '../../Models/iuser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user!: IUser;
  personalInfoForm!: FormGroup;
  addressForm!: FormGroup;
  passwordForm!: FormGroup;
  
  showPersonalInfoModal = false;
  showAddressModal = false;
  showPasswordModal = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  initializeForms() {
    this.personalInfoForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      phone: [''],
      gender: [''],
      DOB: ['']
    });

    this.addressForm = this.fb.group({
      address: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('cPassword');
    return password && confirmPassword && password.value === confirmPassword.value 
      ? null : { passwordMismatch: true };
  }

  loadUserProfile() {
    this.userService.getProfile().subscribe(
      (data: IUserRes) => {
        this.user = data.user;
        this.populateForms();
      },
      error => {
        console.error('Error loading profile:', error);
      }
    );
  }

  populateForms() {
    this.personalInfoForm.patchValue({
      userName: this.user.userName || '',
      phone: this.user.phone || '',
      gender: this.user.gender || '',
      DOB: this.user.DOB ? new Date(this.user.DOB).toISOString().split('T')[0] : ''
    });

    this.addressForm.patchValue({
      address: this.user.address || ''
    });
  }

  // Modal control methods
  editPersonalInfo() {
    this.showPersonalInfoModal = true;
  }

  editAddress() {
    this.showAddressModal = true;
  }

  changePassword() {
    this.showPasswordModal = true;
  }

  closePersonalInfoModal() {
    this.showPersonalInfoModal = false;
  }

  closeAddressModal() {
    this.showAddressModal = false;
  }

  closePasswordModal() {
    this.showPasswordModal = false;
    this.passwordForm.reset();
  }

  closeModal(event: Event) {
    if (event.target === event.currentTarget) {
      this.showPersonalInfoModal = false;
      this.showAddressModal = false;
      this.showPasswordModal = false;
    }
  }

  // Update methods
  updatePersonalInfo() {
    if (this.personalInfoForm.valid) {
      const formData = this.personalInfoForm.value;
      const updateData: IUser = {
        userName: formData.userName,
        phone: formData.phone,
        gender: formData.gender,
        DOB: formData.DOB ? new Date(formData.DOB) : undefined
      };

      this.userService.updateUser(updateData).subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          this.loadUserProfile();
          this.closePersonalInfoModal();
        },
        error => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  updateAddress() {
    if (this.addressForm.valid) {
      const updateData: IUser = {
        address: this.addressForm.value.address
      };

      this.userService.updateUser(updateData).subscribe(
        response => {
          console.log('Address updated successfully:', response);
          this.loadUserProfile();
          this.closeAddressModal();
        },
        error => {
          console.error('Error updating address:', error);
        }
      );
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      const updateData: IUser = {
        password: formData.currentPassword,
        cPassword: formData.password
      };

      this.userService.updatePassword(updateData).subscribe(
        response => {
          console.log('Password updated successfully:', response);
          this.closePasswordModal();
        },
        error => {
          console.error('Error updating password:', error);
        }
      );
    }
  }

  editProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        
        this.userService.uploadProfilePic(formData).subscribe({
          next: (response: any) => {
            console.log('Profile picture uploaded successfully:', response);
            alert('Profile picture uploaded successfully!');
            this.loadUserProfile(); // Reload user data to show new image
          },
          error: (error: any) => {
            console.error('Error uploading profile picture:', error);
            console.error('Full error object:', error);
            if (error.error?.validationError) {
              console.error('Validation errors:', error.error.validationError);
              const validationErrors = error.error.validationError.map((err: any) => err.message).join(', ');
              alert(`Upload failed - Validation errors: ${validationErrors}`);
            } else if (error.error?.errMass) {
              alert(`Upload failed: ${error.error.errMass}`);
            } else if (error.error?.message) {
              alert(`Upload failed: ${error.error.message}`);
            } else {
              alert(`Upload failed: ${error.status} - ${error.statusText || 'Unknown error'}`);
            }
          }
        });
      }
    };
    input.click();
  }

  deleteProfilePicture() {
    if (confirm('Are you sure you want to remove your profile picture?')) {
      this.userService.deleteProfilePic().subscribe(
        response => {
          console.log('Profile picture deleted successfully:', response);
          this.loadUserProfile();
        },
        error => {
          console.error('Error deleting profile picture:', error);
        }
      );
    }
  }
}
