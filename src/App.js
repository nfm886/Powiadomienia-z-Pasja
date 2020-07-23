import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import Watchlist from './components/Watchlist';
import Notifications from './components/Notifications';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/watchlist">
          <Watchlist />
        </Route>
        <Route path="/">
          <Notifications />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
