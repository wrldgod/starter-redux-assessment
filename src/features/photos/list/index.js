import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // Task 7: Import the `removePhoto()` action creator from the photos slice
  selectFilteredPhotos, //Task 13
  // Task 13: Import the `selectFilteredPhotos()` selector from the photos slice
  removePhoto //Task 7
} from '../photos.slice';
import './list.css';

export default function PhotosList() {
  // Task 14: Call `useSelector()` below with `selectFilteredPhotos` instead of `selectAllPhotos`
  const photos = useSelector(selectFilteredPhotos); // Task 14  
  // Task 8: Store a reference to the Redux store's dispatch method in a variable called `dispatch`
  const dispatch = useDispatch(); //Task 8

  function handleDeleteButtonClick(id) {
    // Task 9: Dispatch the `removePhoto()` action creator, passing in the id
    dispatch(removePhoto({ id })); // Task 9
  }

  const photosListItems = photos.map(({ id, caption, imageUrl }) => (
    <li key={id}>
      <img alt={caption} src={imageUrl} />
      <div>
        <p>{caption}</p>
        <button
          data-testid={`${caption}-button`}
          onClick={() => handleDeleteButtonClick(id)}>
          Delete
        </button>
      </div>
    </li>
  ));

  return photosListItems.length > 0 ? (
    <ul>{photosListItems}</ul>
  ) : (
    <h3>No doggies to display...</h3>
  );
}
