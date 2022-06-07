import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../features/task/taskSlice';
import authReducer from '../features/auth/authSlice'


export const store = configureStore({
    reducer: {
      auth: authReducer,
    //   tasks: taskSlice,
    },
  });