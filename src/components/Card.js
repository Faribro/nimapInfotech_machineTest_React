import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../utils/constant";

const Card = ({ id, vote_average, poster_path, original_title }) => (
  <Link to={`/movie/${id}`} className="items">
    <div className="cards">
      <img src={`${IMAGE_URL}${poster_path}`} alt={original_title} className="images" />
      <p className="title">{original_title}</p>
      <p className="rating">Rating: {vote_average}</p>
    </div>
  </Link>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  vote_average: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired
};

export default Card;
