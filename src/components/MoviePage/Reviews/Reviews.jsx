import React, { useState, useEffect, useCallback } from 'react';
import css from './Reviews.module.css';
import { useParams } from 'react-router-dom';
import { movieReviews } from 'Api/Api';

const Reviews = () => {
  const { pageId } = useParams();
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieId = pageId;

  const handelmovieReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const foundedDetails = await movieReviews(movieId);
      setDetails([...foundedDetails.results]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    handelmovieReviews();
  }, [handelmovieReviews]);

  return (
    <>
      {error && !isLoading && <div>{error}</div>}
      {!isLoading && details.length > 0 ? (
        <div>
          <ul className={css.reviews}>
            {details.map(detail => (
              <li key={detail.id}>
                <h3>Author: {detail.author}</h3>
                <p>{detail.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
};

export default Reviews;
