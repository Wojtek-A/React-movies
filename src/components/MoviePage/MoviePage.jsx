import React, { useState, useEffect, useCallback, Suspense } from 'react';
import css from './MoviePage.module.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { movieDetails } from 'Api/Api';
import { LoaderSpinner } from 'components/Loader/Loader';

export const MoviePage = () => {
  const { pageId } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let location = useLocation();
  const backlink = location?.state?.moviesList ?? '/';

  const movieId = pageId;

  const handelmovieDeails = useCallback(async () => {
    setIsLoading(true);
    try {
      const foundedDetails = await movieDetails(movieId);
      setDetails(foundedDetails);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    handelmovieDeails();
  }, [handelmovieDeails]);

  return (
    <>
      <Link to={backlink}>
        <button>← Go back</button>
      </Link>
      {isLoading && <LoaderSpinner />}
      {error && !isLoading && <div>{error}</div>}
      {!isLoading && details !== null && (
        <div>
          <div className={css.movieDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w154${details.poster_path}`}
              alt={details.title}
              width="500"
            />
            <div className={css.movieDetailsText}>
              <h2>
                {details.title} ({details.release_date.slice(0, 4)})
              </h2>
              <p>User Score: {Math.round(details.vote_average) * 10} %</p>
              <h3>Overview</h3>
              <p>{details.overview}</p>
              <h3>Geners</h3>
              <ul className={css.movieDetailsGeners}>
                {details.genres.map(genere => (
                  <li key={genere.name}>{genere.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            {
              <Suspense fallback={<div>Page is loading</div>}>
                <ul className={css.movieDetailsInformations}>
                  <li>
                    <Link to="cast"> Cast </Link>
                  </li>
                  <li>
                    <Link to="reviews"> Reviews </Link>
                  </li>
                </ul>
                <Outlet />
              </Suspense>
            }
          </div>
        </div>
      )}
    </>
  );
};
