import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import charityService from '../../services/charityService';

// Fetch all charities
export const fetchCharities = createAsyncThunk(
  'charities/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await charityService.getAllCharities();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Apply to a charity
export const applyCharity = createAsyncThunk(
  'charities/apply',
  async (charityData, { rejectWithValue }) => {
    try {
      const response = await charityService.applyCharity(charityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch featured charities
export const fetchFeaturedCharities = createAsyncThunk(
  'charities/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await charityService.getFeaturedCharities();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const charitySlice = createSlice({
  name: 'charities',
  initialState: {
    charities: [],
    pendingApplications: [],
    featured: [], // Add this to store featured charities
    loading: false,
    error: null,
  },
  reducers: {
    clearCharityError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all charities
      .addCase(fetchCharities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharities.fulfilled, (state, action) => {
        state.loading = false;
        state.charities = action.payload;
      })
      .addCase(fetchCharities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Apply charity
      .addCase(applyCharity.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyCharity.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingApplications.push(action.payload);
      })
      .addCase(applyCharity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Featured charities
      .addCase(fetchFeaturedCharities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedCharities.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchFeaturedCharities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCharityError } = charitySlice.actions;
export default charitySlice.reducer;
