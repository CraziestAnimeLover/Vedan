import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
 // Import redux-thunk

import authReducer from './authSlice';  // Assuming you have an authSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),  // Add redux-thunk to middleware
});

export default store;
