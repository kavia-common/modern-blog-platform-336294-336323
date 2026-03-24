import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar - Top navigation bar matching "THE BLOG" Figma design.
 *
 * Contract:
 *   - Renders brand name "John McLane", menu links (Blog, Projects, About, Newsletter),
 *     and a dark toggle-mode pill with sun/moon icons.
 *   - Responsive: collapses to hamburger on small screens.
 *   - Inputs: none (reads location from React Router for active states)
 *   - Outputs: JSX navigation element
 *   - Side effects: none
 */
// PUBLIC_INTERFACE
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="tb-navbar" role="navigation" aria-label="Main navigation">
      <div className="tb-navbar-inner">
        {/* Brand name */}
        <Link to="/" className="tb-navbar-brand" onClick={() => setMenuOpen(false)}>
          John McLane
        </Link>

        {/* Desktop menu */}
        <ul className="tb-navbar-menu" role="list">
          <li>
            <Link to="/" className={`tb-nav-link${isActive('/') ? ' tb-nav-link--active' : ''}`}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/create" className={`tb-nav-link${isActive('/create') ? ' tb-nav-link--active' : ''}`}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/bookmarks" className={`tb-nav-link${isActive('/bookmarks') ? ' tb-nav-link--active' : ''}`}>
              About
            </Link>
          </li>
          <li>
            <a href="#newsletter" className="tb-nav-link">Newsletter</a>
          </li>

          {/* Toggle mode pill */}
          <li>
            <button
              className="tb-toggle-pill"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={darkMode}
            >
              {/* Sun icon */}
              <span className={`tb-toggle-icon${!darkMode ? ' tb-toggle-icon--active' : ''}`} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19.25C8 19.25 4.75 16 4.75 12C4.75 8 8 4.75 12 4.75C16 4.75 19.25 8 19.25 12C19.25 16 16 19.25 12 19.25ZM12 6.25C8.83 6.25 6.25 8.83 6.25 12C6.25 15.17 8.83 17.75 12 17.75C15.17 17.75 17.75 15.17 17.75 12C17.75 8.83 15.17 6.25 12 6.25Z" fill="white"/>
                  <path d="M12 22.96C11.45 22.96 11 22.55 11 22V21.92C11 21.37 11.45 20.92 12 20.92C12.55 20.92 13 21.37 13 21.92C13 22.47 12.55 22.96 12 22.96ZM19.14 20.14C18.88 20.14 18.63 20.04 18.43 19.85L18.3 19.72C17.91 19.33 17.91 18.7 18.3 18.31C18.69 17.92 19.32 17.92 19.71 18.31L19.84 18.44C20.23 18.83 20.23 19.46 19.84 19.85C19.65 20.04 19.4 20.14 19.14 20.14ZM4.86 20.14C4.6 20.14 4.35 20.04 4.15 19.85C3.76 19.46 3.76 18.83 4.15 18.44L4.28 18.31C4.67 17.92 5.3 17.92 5.69 18.31C6.08 18.7 6.08 19.33 5.69 19.72L5.56 19.85C5.37 20.04 5.11 20.14 4.86 20.14ZM22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.04 11.45 3.04 12C3.04 12.55 2.63 13 2.08 13ZM19.01 5.99C18.75 5.99 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.68 18.3 4.29L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18 19.84 5.57L19.71 5.7C19.52 5.89 19.27 5.99 19.01 5.99ZM4.99 5.99C4.73 5.99 4.48 5.89 4.28 5.7L4.15 5.56C3.76 5.17 3.76 4.54 4.15 4.15C4.54 3.76 5.17 3.76 5.56 4.15L5.69 4.28C6.08 4.67 6.08 5.3 5.69 5.69C5.5 5.89 5.24 5.99 4.99 5.99ZM12 3.04C11.45 3.04 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.04 12 3.04Z" fill="white"/>
                </svg>
              </span>
              {/* Moon icon */}
              <span className={`tb-toggle-icon tb-toggle-icon--moon${darkMode ? ' tb-toggle-icon--active' : ''}`} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white"/>
                </svg>
              </span>
            </button>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="tb-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`tb-hamburger-lines${menuOpen ? ' tb-hamburger-lines--open' : ''}`} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="tb-mobile-menu" role="dialog" aria-label="Mobile navigation">
          <ul className="tb-mobile-links" role="list">
            <li>
              <Link to="/" className={`tb-mobile-link${isActive('/') ? ' tb-mobile-link--active' : ''}`} onClick={() => setMenuOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/create" className={`tb-mobile-link${isActive('/create') ? ' tb-mobile-link--active' : ''}`} onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/bookmarks" className={`tb-mobile-link${isActive('/bookmarks') ? ' tb-mobile-link--active' : ''}`} onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <a href="#newsletter" className="tb-mobile-link" onClick={() => setMenuOpen(false)}>
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
