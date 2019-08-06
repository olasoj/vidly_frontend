import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='#'>
        Navbar
      </Link>

      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/movies'>
              Movies
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/customers'>
              Customers
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/rentals'>
              Rentals
            </NavLink>
          </li>
          {user && (
            <Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/profile'>
                  {user.name}
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/logout'>
                  Logout
                </NavLink>
              </li>
            </Fragment>
          )}
          {!user && (
            <Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>
                  Register
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
