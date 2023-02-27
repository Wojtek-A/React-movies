import React, { useState, useEffect } from 'react';
import { trendingMovies } from 'Api/Api';
import { LoaderSpinner } from '../Loader/Loader';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrendingMovies = async () => {
    setIsLoading(true);
    try {
      const foundedTrendingMovies = await trendingMovies();
      setMovies([...foundedTrendingMovies]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleTrendingMovies();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {isLoading && movies.length === 0 && <LoaderSpinner />}
      {!isLoading && movies.length !== 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {movie.name || movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
