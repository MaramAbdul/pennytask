// import { createReducer, on } from '@ngrx/store';
// import { setUser, clearUser } from './user.actions';
// import { UserState, initialState } from './user.state';

// export const userReducer = createReducer(
//   initialState,
//   on(setUser, (state, { user }) => ({ ...state, user })),  // Store full User object
//   on(clearUser, (state) => ({ ...state, user: null }))  // Clear user on logout
// );


import { createReducer, on } from '@ngrx/store';
import { clearUser, setUser } from './user.actions';
import { User } from './user.model';

// ✅ Ensure localStorage is checked correctly
const storedUser = localStorage.getItem('user');
const initialState: User | null = storedUser ? JSON.parse(storedUser) : null;

export const userReducer = createReducer(
  initialState,

  on(setUser, (state, { user }) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // ✅ Store user in localStorage
    }
    return user; // ✅ Store full user object in NgRx state
  }),

  on(clearUser, () => {
    localStorage.removeItem('user'); // ✅ Remove from localStorage on logout
    return null;
  })
);