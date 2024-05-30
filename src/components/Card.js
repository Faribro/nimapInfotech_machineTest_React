import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../utils/constant";

const Card = ({ id, vote_average, poster_path, original_title }) => {
  const imageUrl = `${IMAGE_URL}${poster_path}`; // Construct image URL

  return (
    <Link to={`/movie/${id}`} className="col-md-3 col-sm-6 col-12 mb-4">
      <div className="card h-100 shadow-sm rounded overflow-hidden">
        <img
          src={imageUrl}
          className="card-img-top transition duration-300 hover:opacity-75" // Image size & transition
          alt={original_title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150x200?text=Image+Not+Found"; // Placeholder on error
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between bg-gray-100">  <h5 className="card-title text-dark font-bold">{original_title}</h5>  <p className="card-text text-gray-700">Rating: {vote_average}</p> </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  vote_average: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
};

export default Card;
