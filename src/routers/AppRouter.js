import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { FetchOnRender } from '../components/FetchOnRender';
import { FetchThenRender } from '../components/FetchThenRender';
import { ContentionState } from '../components/ContentionState';
import { ConcurrentMode } from '../components/ConcurrentMode';
import { RenderAsYouFetch } from '../components/RenderAsYouFetch';

export const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" component={FetchOnRender} exact={true} />
        <Route
          path="/fetch-then-render"
          component={FetchThenRender}
          exact={true}
        />
        <Route
          path="/render-as-you-fetch"
          component={RenderAsYouFetch}
          exact={true}
        />
        <Route path="/contention" component={ContentionState} exact={true} />
        <Route path="/concurrent" component={ConcurrentMode} exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
);
