import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './src/features/UserSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchFunc = typeof store.dispatch;
