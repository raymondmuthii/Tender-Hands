// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import charityReducer from './slices/charitySlice';
import donationReducer from './slices/donationSlice';
import storyReducer from './slices/storySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    charities: charityReducer,
    donations: donationReducer,
    stories: storyReducer,
  },
});

export default store;
