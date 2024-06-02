import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'; // Import CSS file for custom styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">MovieDb</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Popular</Link>
            </li>
            <li className="nav-item">
              <Link to="/top-rated" className="nav-link">Top Rated</Link>
            </li>
            <li className="nav-item">
              <Link to="/upcoming" className="nav-link">Upcoming</Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
