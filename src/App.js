import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchMoviesHandler = useCallback(async ()=> {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-37bac-default-rtdb.firebaseio.com//movies.json');
      if (response.status=== 404) {
        
        throw new Error("something went wrong");
      }
      const data = await response.json();
      // console.log(response.status.toString());
const loadMovies =[];

for (const key in data) {
 loadMovies.push({
   id:key,
   title:data[key].title,
   openingText:data[key].openingText,
   releaseDate:data[key].releaseDate
 })
}

      setMovies(loadMovies);
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


  async function addMovieHandler(movie) {
   const reponse = await fetch('https://react-http-37bac-default-rtdb.firebaseio.com/movies.json',{
     method:'POST',
     body: JSON.stringify(movie),
     headers:{
       'Content-type' : 'application/json'
     }
   });

   const data = await reponse.json();
console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;
