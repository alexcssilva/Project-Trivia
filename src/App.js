import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Screen from './pages/Screen';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/screen" component={ Screen } />
            <Route exact path="/settings" component={ Settings } />
            <Route exact path="/feedback" component={ Feedback } />
            <Route exact path="/ranking" component={ Ranking } />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}
