import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import './Navbar.css';

/**
 * Navbar component - Top navigation bar for the blog platform
 * Includes logo, navigation links, search bar, and mobile menu
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { setSearch } = useBlog();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    navigate('/');
    setSearchOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearch('');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar-logo-icon" aria-hidden="true">✍️</span>
          <span className="navbar-logo-text">BlogHub</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-links">
          <li>
            <Link
              to="/"
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/bookmarks"
              className={`navbar-link ${isActive('/bookmarks') ? 'active' : ''}`}
              aria-current={isActive('/bookmarks') ? 'page' : undefined}
            >
              Bookmarks
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className="navbar-link navbar-link-cta"
              aria-current={isActive('/create') ? 'page' : undefined}
            >
              + Write Post
            </Link>
          </li>
        </ul>

        {/* Search & Actions */}
        <div className="navbar-actions">
          {/* Desktop Search */}
          <form
            className={`navbar-search-form ${searchOpen ? 'open' : ''}`}
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Search posts"
          >
            <button
              type="button"
              className="navbar-search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {searchOpen && (
              <div className="navbar-search-input-wrap">
                <input
                  type="search"
                  className="navbar-search-input"
                  placeholder="Search posts..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  aria-label="Search posts"
                  autoFocus
                />
                {searchInput && (
                  <button
                    type="button"
                    className="navbar-search-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </form>

          {/* Mobile menu toggle */}
          <button
            className="navbar-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`hamburger ${menuOpen ? 'open' : ''}`} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu" role="dialog" aria-label="Mobile navigation">
          {/* Mobile Search */}
          <form
            className="navbar-mobile-search"
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <input
              type="search"
              placeholder="Search posts..."
              value={searchInput}
              onChange={handleSearchChange}
              className="navbar-mobile-search-input"
              aria-label="Search posts"
            />
            <button type="submit" className="navbar-mobile-search-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          <ul className="navbar-mobile-links">
            <li>
              <Link
                to="/"
                className={`navbar-mobile-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                to="/bookmarks"
                className={`navbar-mobile-link ${isActive('/bookmarks') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                🔖 Bookmarks
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="navbar-mobile-link navbar-mobile-link-cta"
                onClick={() => setMenuOpen(false)}
              >
                ✍️ Write Post
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
