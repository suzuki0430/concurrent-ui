import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { App } from './App';
import { AppRouter } from './routers/AppRouter';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<AppRouter />);
