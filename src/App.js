import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchMoviesHandler = useCallback(async ()=> {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (response.status=== 404) {
        
        throw new Error("something went wrong");
      }
      const data = await response.json();
      // console.log(response.status.toString());
      const trasnformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(trasnformedMovies);
      setIsLoading(false);
    } catch (error) {
      // console.error(error);
      setError(error.message);
    }
    setIsLoading(false);
  },[]);
  
  useEffect(() =>{
  fetchMoviesHandler();
  },[fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
