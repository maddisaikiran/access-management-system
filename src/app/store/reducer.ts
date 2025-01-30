import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './userReducer';

// Define the state structure
export interface AppState {
  user: {
    name: string;
    email: string;
    mobile: string;
  };
}

// Map reducers to state slices
export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};
