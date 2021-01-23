import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div style={{ margin: '20px' }}>
        <p>
          <NavLink to="/" activeClassName="is-active" exact={true}>
            Fetch-on-Render
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/fetch-then-render"
            activeClassName="is-active"
            exact={true}
          >
            Fetch-Then-Render
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/render-as-you-fetch"
            activeClassName="is-active"
            exact={true}
          >
            Render-as-You-Fetch
          </NavLink>
        </p>
        <p>
          <NavLink to="/contention" activeClassName="is-active" exact={true}>
            Contention State
          </NavLink>
        </p>
        <p>
          <NavLink to="/concurrent" activeClassName="is-active">
            Concurrent mode
          </NavLink>
        </p>
      </div>
    </header>
  );
};
