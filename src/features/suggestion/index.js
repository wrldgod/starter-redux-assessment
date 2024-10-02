import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestion, selectSuggestion, selectLoading, selectError } from './suggestion.slice';
import './suggestion.css';

export default function Suggestion() {
  // Task 19: Call useSelector() with the selectSuggestion() selector
  // The component needs to access the `imageUrl` and `caption` properties of the suggestion object.
  const loading = useSelector(selectLoading); // Call useSelector with the selectLoading() selector
  const error = useSelector(selectError); // Call useSelector with the selectError() selector
  const suggestion = useSelector(selectSuggestion); // Call useSelector with the selectSuggestion() selector
  const dispatch = useDispatch();

  const { imageUrl, caption } = suggestion; // Destructure imageUrl and caption from the suggestion object

  useEffect(() => {
    const loadSuggestion = async () => {
        await dispatch(fetchSuggestion()); // Dispatch the fetchSuggestion action creator
    };
    loadSuggestion(); // Call the function to load suggestion
}, [dispatch]); // Add dispatch as a dependency

  let render;
  if (loading) {
    render = <h3>Loading...</h3>;
  } else if (error) {
    render = <h3>Sorry, we're having trouble loading the suggestion.</h3>;
  } else {
    // Task 21: Enable the two JSX lines below needed to display the suggestion on the page
    render = (
      <>
      <img alt={caption} src={imageUrl} /> {/* Display the suggestion image */}
      <p>{caption}</p> {/* Display the suggestion caption */}
      </>
    );
  }

  return (
    <section className="suggestion-container">
      <h2>Suggestion of the Day</h2>
      {render}
    </section>
  );
}
