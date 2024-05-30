import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Get current scroll position
      setIsScrolled(scrollY > 0); // Update state based on scroll
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`animate__animated animate__fadeInDown bg-dark d-flex justify-content-between align-items-center px-5 py-4 sticky-top transition duration-300 ${
        isScrolled ? 'opacity-low' : ''
      }`}
    >
      <Link to="/" className="navbar-brand text-white h3 mb-0">MovieDb</Link>
      <nav className="d-flex">
        <ul className="nav-items mb-0 d-flex justify-content-between w-75"> {/* Adjust width for even spacing */}
          <li className="nav-item">
            <Link to="/" className="nav-link text-white active">Popular</Link>
          </li>
          <li className="nav-item">
            <Link to="/top-rated" className="nav-link text-white">Top Rated</Link>
          </li>
          <li className="nav-item">
            <Link to="/upcoming" className="nav-link text-white">Upcoming</Link>
          </li>
        </ul>
        <form className="ms-auto d-flex align-items-center" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
