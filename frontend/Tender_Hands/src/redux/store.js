import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import charityReducer from './slices/charitySlice';
import donationReducer from './slices/donationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    charity: charityReducer,
    donation: donationReducer,
  },
});

export default store;
