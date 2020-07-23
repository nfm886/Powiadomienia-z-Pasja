import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/settings">Ustawienia</Link>
        </li>
        <li>
          <Link to="/watchlist">Obserwowane</Link>
        </li>
        <li>
          <Link to="/">Powiadomienia</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;