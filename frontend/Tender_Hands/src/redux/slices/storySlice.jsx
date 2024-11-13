import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storyService from '../../services/storyService';

// Rest of your async thunks and slice code remains the same
export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async (charityId = null, { rejectWithValue }) => {
    try {
      const response = charityId 
        ? await storyService.getCharityStories(charityId)
        : await storyService.getAllStories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// The rest of your code remains exactly the same
export const createStory = createAsyncThunk(
  'stories/createStory',
  async (storyData, { rejectWithValue }) => {
    try {
      const response = await storyService.createStory(storyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const storySlice = createSlice({
  name: 'stories',
  initialState: {
    stories: [],
    featuredStories: [],
    currentStory: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  },
  reducers: {
    setCurrentStory: (state, action) => {
      state.currentStory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFeaturedStories: (state, action) => {
      state.featuredStories = action.payload;
    },
    updateStoryLikes: (state, action) => {
      const { storyId, likes } = action.payload;
      const story = state.stories.find(s => s.id === storyId);
      if (story) {
        story.likes = likes;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch stories cases
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload.stories;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems
        };
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create story cases
      .addCase(createStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.unshift(action.payload); // Add new story to the beginning
      })
      .addCase(createStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

// Selectors
export const selectAllStories = (state) => state.stories.stories;
export const selectFeaturedStories = (state) => state.stories.featuredStories;
export const selectCurrentStory = (state) => state.stories.currentStory;
export const selectStoriesLoading = (state) => state.stories.loading;
export const selectStoriesError = (state) => state.stories.error;
export const selectStoriesPagination = (state) => state.stories.pagination;

export const { 
  setCurrentStory, 
  clearError, 
  setFeaturedStories,
  updateStoryLikes 
} = storySlice.actions;

export default storySlice.reducer;
