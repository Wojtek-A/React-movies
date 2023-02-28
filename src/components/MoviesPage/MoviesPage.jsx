import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { searchMovies } from 'Api/Api';
import { LoaderSpinner } from '../Loader/Loader';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const [query, setQuery] = useState(parsedParams?.query || '');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [submit, setSubmit] = useState(true);

  const handelChange = event => {
    setQuery(event.target.value);
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      handelSubmit(event);
    }
  };

  const handelSubmit = event => {
    event.preventDefault();
    setSearchParams({ query });
    setSubmit(true);
  };

  const handelsearchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const foundedMovies = await searchMovies(query);
      setMovies([...foundedMovies]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (submit) {
      handelsearchMovies().then(() => setSubmit(false));
    }
  }, [submit, handelsearchMovies]);

  return (
    <>
      <form onSubmit={handelSubmit}>
        <input onChange={handelChange} onKeyDown={onKeyDown} type="text" />
        <button type="submit">Search</button>
      </form>
      {isLoading && movies.length === 0 && <LoaderSpinner />}
      {!isLoading && movies.length !== 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ moviesList: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
