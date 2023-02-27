import React, { useState, useEffect } from 'react';
import css from './Cast.module.css';
import { useParams } from 'react-router-dom';
import { movieCast } from 'Api/Api';

const Cast = () => {
  const { pageId } = useParams();
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieId = pageId;

  useEffect(() => {
    const handelmovieCast = async () => {
      setIsLoading(true);
      try {
        const foundedDetails = await movieCast(movieId);
        setDetails([...foundedDetails.cast]);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    handelmovieCast();
  }, []);

  return (
    <>
      {error && !isLoading && <div>{error}</div>}
      {!isLoading && details.length > 0 ? (
        <div>
          <ul className={css.cast}>
            {details.map(detail => (
              <li key={detail.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w154${detail.profile_path}`}
                  alt={detail.title}
                />
                <p>{detail.name}</p>
                <p>Character: {detail.character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>We don't have any cast detail for this movie.</p>
      )}
    </>
  );
};

export default Cast;
