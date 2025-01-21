// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { User } from './user.model';

// export const selectUser = createFeatureSelector<User>('user');

// export const selectUserName = createSelector(
//   selectUser,
//   (user: User) => user.name
// );
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

// ✅ Fix selector to correctly extract `user`
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user  // ✅ Extracts the user object
);

export const selectUserName = createSelector(
  selectUserState,
  (state: UserState) => state.user?.name || ''  // ✅ Extracts name safely
);

export const selectUserEmail = createSelector(
  selectUserState,
  (state: UserState) => state.user?.email || ''  // ✅ Extracts email safely
);