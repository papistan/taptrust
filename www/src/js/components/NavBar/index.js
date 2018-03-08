import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavBar = () => (
  <Navbar fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <div style={{ margin: '0 0 20px' }}>
          <a
            href="http://www.taptrust.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="http://www.taptrust.com/static/img/logo.png"
              style={{ width: '150px' }}
              alt="logo"
            />
          </a>
        </div>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
);

export default NavBar;
