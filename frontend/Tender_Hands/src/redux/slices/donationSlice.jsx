// src/redux/slices/donationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import donationService from '../../services/donationService';

export const createDonation = createAsyncThunk(
  'donations/create',
  async (donationData, { rejectWithValue }) => {
    try {
      const response = await donationService.createDonation(donationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDonations = createAsyncThunk(
  'donations/fetchUserDonations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await donationService.getUserDonations(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const donationSlice = createSlice({
  name: 'donations',
  initialState: {
    donations: [],
    recurringDonations: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDonationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
      })

      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.isRecurring) {
          state.recurringDonations.push(action.payload);
        } else {
          state.donations.push(action.payload);
        }
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload.donations;
        state.recurringDonations = action.payload.recurringDonations;
      })
      .addCase(fetchUserDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDonationError } = donationSlice.actions;
export default donationSlice.reducer;
