import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { ContentionState } from '../components/ContentionState';
import { ConcurrentMode } from '../components/ConcurrentMode';

export const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" component={ContentionState} exact={true} />
        <Route path="/concurrent" component={ConcurrentMode} />
      </Switch>
    </div>
  </BrowserRouter>
);
