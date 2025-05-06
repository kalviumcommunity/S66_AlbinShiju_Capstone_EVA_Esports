import React from 'react';
import "../css/Navbar.css";
import logo from "./logo.png"

import {
  Gamepad,
  Trophy,
  Users,
  Brackets,
  UserCircle,
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <img src={logo} className="logo-icon" size={30}/>
        </div>
        <span><a className="navbar-title" href="/home">EVA Esports</a></span>
      </div>
      <ul className="navbar-links">
        <li><a href="/games" className="nav-link"><Gamepad className="nav-icon" size={20} />Games</a></li>
        <li><a href="/tournaments" className="nav-link"><Trophy className="nav-icon" size={20} />Tournaments</a></li>
        <li><a href="/teams" className="nav-link"><Users className="nav-icon" size={20} />Teams</a></li>
        <li><a href="/brackets" className="nav-link"><Brackets className="nav-icon" size={20} />Brackets</a></li>
        <li><a href="/profile" className="nav-link"><UserCircle className="nav-icon" size={20} />Profile</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
