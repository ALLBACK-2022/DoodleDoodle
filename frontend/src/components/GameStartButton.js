import React from 'react';
import { Link } from 'react-router-dom';

function GameStartButton() {
  return (
    <Link to="random">
      <button type="button" className="text-6xl text-primary-1 font-cookierun startshadow textborder">
        start
      </button>
    </Link>
  );
}

export default GameStartButton;
