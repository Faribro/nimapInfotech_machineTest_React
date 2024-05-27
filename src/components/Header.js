import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search.trim());
  };

  return (
    <header className="container">
      <nav className="navbar">
        <Link to="/" className="logo-name">MovieDb</Link>
        <div className="nav-items">
          <ul className="nav-list">
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
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Movie Name"
              name="search"
              className="input-field"
              value={search}
              onChange={handleInputChange}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Header;
