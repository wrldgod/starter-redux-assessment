import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion
export const fetchSuggestion = createAsyncThunk('suggestion/fetchSuggestion', async () => {
    const response = await fetch('http://localhost:3004/api/suggestion');
    // Check if the response is okay (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse and return the JSON data from the response
    return response.json();    const data = await response.json(); // Parse and return the JSON data from the response
    return data; // Ensure this returns the correct data structure
});

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  // Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
        state.error = null;   // Reset error state
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        state.suggestion = action.payload; // Store the fetched suggestion in state
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.error.message; // Capture the error message
      });
  },
};

const suggestionSlice = createSlice(options);

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion; // Selector to get the suggestion data from state

export const selectLoading = (state) => state.suggestion.loading; // Selector to get loading state
export const selectError = (state) => state.suggestion.error; // Selector to get error state

export default suggestionSlice.reducer; // Export the reducer