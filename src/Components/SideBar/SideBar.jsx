import React from 'react';
import {Link } from 'react-router';
import '../../App.css';




function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/habits">Habits</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/ai">AI Chat</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;