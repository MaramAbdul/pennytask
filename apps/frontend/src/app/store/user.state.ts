import { User } from './user.model';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};