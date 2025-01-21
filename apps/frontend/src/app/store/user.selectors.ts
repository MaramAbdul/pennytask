// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { User } from './user.model';

// export const selectUser = createFeatureSelector<User>('user');

// export const selectUserName = createSelector(
//   selectUser,
//   (user: User) => user.name
// );
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from './user.model';

// ✅ Define feature selector for 'user' slice in store
export const selectUserFeature = createFeatureSelector<User | null>('user');

// ✅ Create a selector to access user data
export const selectUser = createSelector(selectUserFeature, (state) => state);