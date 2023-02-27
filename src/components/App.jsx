import React from 'react';
import { AppRoutes } from './AppRoutes';
import { Header } from './Header/Header';

export const App = () => {
  return (
    <div>
      <Header />
      <AppRoutes />
    </div>
  );
};
