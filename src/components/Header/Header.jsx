import React from 'react';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className={css.header}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${css.linkActive}` : `${css.link}`
        }
      >
        <h4>Home</h4>
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? `${css.linkActive}` : `${css.link}`
        }
      >
        <h4>Movies</h4>
      </NavLink>
    </nav>
  );
};
