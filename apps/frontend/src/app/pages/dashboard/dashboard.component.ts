
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/user.model';
import { selectUser } from '../../store/user.selectors';
import { Router } from '@angular/router';
import { clearUser } from '../../store/user.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule],
})
export class DashboardComponent {
  user$: Observable<User | null>;

  constructor(private store: Store, private router: Router) {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    localStorage.removeItem('token');  // ✅ Remove JWT token
    this.store.dispatch(clearUser());  // ✅ Clear user from NgRx store
    this.router.navigate(['/']); // ✅ Redirect to Register/Login page
  }
}