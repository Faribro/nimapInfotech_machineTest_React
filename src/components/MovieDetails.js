import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { IMAGE_URL } from "../utils/constant";
import NotFoundMessage from "./NotFoundMessage";

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        if (!response.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await response.json();
        setDetails(data);
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch details", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return <NotFoundMessage />;
  }

  if (!details) {
    return null;
  }

  const { original_title, vote_average, genres, release_date, overview, poster_path, backdrop_path } = details;
  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <>
      <Header />
      <div className="details-cast-section">
        <div className="details-section">
          <div className="details">
            <div className="bg">
              <img src={`${IMAGE_URL}${poster_path}`} alt={original_title} className="movie-item" />
              <div className="bg-items">
                <h3 className="details-title">{original_title}</h3>
                <p className="details-rating">Rating: {vote_average}</p>
                <p className="details-genres">Genres: {genres.map(genre => genre.name).join(", ")}</p>
                <p className="details-release-date">Release Date: {formattedDate}</p>
              </div>
            </div>
            <div className="movie-details">
              <h2 className="overview">Overview:</h2>
              <p className="paragraph">{overview}</p>
            </div>
          </div>
          <div className="background-image">
            <img src={`${IMAGE_URL}${backdrop_path}`} alt="Background" className="item-images" />
          </div>
        </div>
        <div className="cast">
          <h2 className="cast-heading">Cast</h2>
          <ul className="cast-list">
            {cast.map(actor => (
              <li key={actor.id} className="cast-item">
                <img src={`${IMAGE_URL}${actor.profile_path}`} alt={actor.name} className="cast-image" />
                <div className="cast-details">
                  <p className="cast-name">{actor.name}</p>
                  <p className="cast-character">{actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
