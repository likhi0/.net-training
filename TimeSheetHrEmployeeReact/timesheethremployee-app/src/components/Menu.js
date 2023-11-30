import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/Register">Register</Link>
          </li>
          <NavDropdown title="Profile" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/AddProfiles">AddProfile</NavDropdown.Item>
            <NavDropdown.Item href="#">Update Hotel</NavDropdown.Item>
            <NavDropdown.Item href="#">Delete Hotel</NavDropdown.Item>
          </NavDropdown>
          <li className="nav-item">
            <Link className="nav-link" to="/TimeSheet">TimeSheet</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
