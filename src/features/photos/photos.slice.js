import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos.
    addPhoto: (state, action) => {
      // Use unshift to add the new photo at the beginning of the array
      state.photos.unshift(action.payload); 
    },
    // Task 6: Create a `removePhoto()` case reducer that removes a photo from state.photos
    removePhoto: (state, action) => {
      // Use splice to remove the photo based on its id
      const index = state.photos.findIndex(photo => photo.id === action.payload.id);
      if (index !== -1) {
        state.photos.splice(index, 1);
      }
    },
  },
};

// Create the slice
const photosSlice = createSlice(options);

// Export the actions created by the slice
export const { addPhoto, removePhoto } = photosSlice.actions;

// Export the reducer to be used in the store
export default photosSlice.reducer;

// Selectors
export const selectAllPhotos = (state) => state.photos.photos;

export const selectFilteredPhotos = (state) => {
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
  const searchTerm = state.search.searchTerm.toLowerCase();
  return state.photos.photos.filter(photo => 
      photo.caption.toLowerCase().includes(searchTerm) //Task 12
  );
};
