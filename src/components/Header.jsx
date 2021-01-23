import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div className="nav">
        <NavLink to="/" activeClassName="is-active" exact={true}>
          Contention State
        </NavLink>
        <NavLink to="/concurrent" activeClassName="is-active">
          Concurrent mode
        </NavLink>
      </div>
    </header>
  );
};
