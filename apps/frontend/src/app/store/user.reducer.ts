import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { UserState, initialState } from './user.state';

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),  // Store full User object
  on(clearUser, (state) => ({ ...state, user: null }))  // Clear user on logout
);