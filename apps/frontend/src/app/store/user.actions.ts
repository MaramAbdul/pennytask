import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const setUser = createAction(
  '[User] Set User',
  props<{ user: User }>()  // Accepts the full user object
);

export const clearUser = createAction('[User] Clear User');