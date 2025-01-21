import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';  // ✅ Import NgForm
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/user.actions';
import { User } from '../../store/user.model';
import { Observable } from 'rxjs';
import { selectUser } from '../../store/user.selectors';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule,RouterModule], 
})
export class RegisterComponent {
  name = '';  
  email = '';
  password = '';
  errorMessage = '';
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService, 
    private store: Store, 
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  register(form: NgForm) {
    // ✅ Prevent submission if form is invalid
    if (form.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      return;
    }

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful:', response); 

        // ✅ Store JWT token
        localStorage.setItem('token', response.token);

        // ✅ Extract user details
        const user: User = {
          id: response.user.id, 
          name: response.user.name, 
          email: response.user.email
        };

        // ✅ Dispatch action to store user in NgRx
        this.store.dispatch(setUser({ user }));

        // ✅ Log stored user state after dispatching
        this.user$.subscribe((storedUser) => {
          console.log('Stored User in NgRx:', storedUser);
        });

        // ✅ Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}