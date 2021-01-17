import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { NormalMode } from '../components/NormalMode';
import { ConcurrentMode } from '../components/ConcurrentMode';

export const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" component={NormalMode} exact={true} />
        <Route path="/concurrent" component={ConcurrentMode} />
      </Switch>
    </div>
  </BrowserRouter>
);
