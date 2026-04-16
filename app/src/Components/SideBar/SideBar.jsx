import React from 'react';
import {Link } from 'react-router';
import './SideBar.scss';




function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link className='sidebar-link' to="/habits">Habits</Link>
        </li>
        <li>
          <Link className='sidebar-link' to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link className='sidebar-link' to="/ai">AI Chat</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;