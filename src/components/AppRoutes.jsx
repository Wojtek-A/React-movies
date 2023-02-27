import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { MoviesPage } from './MoviesPage/MoviesPage';
import { MoviePage } from './MoviePage/MoviePage';

const Cast = lazy(() => import('./MoviePage/Cast/Cast'));
const Reviews = lazy(() => import('./MoviePage/Reviews/Reviews'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="movies" element={<MoviesPage />} />
      <Route path="movies/:pageId" element={<MoviePage />}>
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
};
