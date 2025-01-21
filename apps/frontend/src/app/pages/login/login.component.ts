import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router ,RouterModule} from '@angular/router'; 
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/user.actions';
import { User } from '../../store/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule,RouterModule], 
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private store: Store, private router: Router) {}

  login(form: NgForm) {
    // ✅ Prevent submission if form is invalid
    if (form.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      return;
    }

    console.log('Logging in with:', this.email, this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful, response:', response);

        // ✅ Store token in localStorage
        localStorage.setItem('token', response.token);

        // ✅ Extract user details
        const user: User = {
          id: response.user.id, 
          name: response.user.name, 
          email: response.user.email
        };

        // ✅ Dispatch action to store user in NgRx state
        this.store.dispatch(setUser({ user }));

        // ✅ Navigate to Dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
        console.error('Login error:', err);
      }
    });
  }
}