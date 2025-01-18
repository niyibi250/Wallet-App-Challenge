import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './features/auth/SignupSlice';
import signInReducer from './features/auth/LoginSlice';


export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signIn: signInReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
