import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { IMAGE_URL } from "../utils/constant";
import NotFoundMessage from "./NotFoundMessage";
import { Carousel } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        if (!response.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await response.json();
        setDetails(data);

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast);
      } catch (error) {
        console.error("Failed to fetch details", error);
      } finally {
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

  const { original_title, vote_average, genres, release_date, overview, backdrop_path, poster_path } = details;
  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <div
        className="container-fluid movie-details-bg"
        style={{
          backgroundImage: `url(${IMAGE_URL}${backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "4rem",
          marginBottom: "1rem",
          padding: "0 7rem",
          backgroundRepeat: "no-repeat",
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${IMAGE_URL}${backdrop_path})`,
          animation: "fade 1s ease-in-out forwards"
        }}
      >
        <div className="container py-5">
          <div className="row dot">
            <div className="col-lg-4">
              <img src={`${IMAGE_URL}${poster_path}`} alt={original_title} className="img-fluid mb-3" />
            </div>
            <div className="col-lg-8">
              <h1>{original_title}</h1>
              <p>Rating: {vote_average}</p>
              <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
              <p>Release Date: {formattedDate}</p>
              <h2>Overview</h2>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-5">
          <h4 className="mb-4">Cast</h4>
          <Carousel id="cast-slider"> 
            {cast.reduce((acc, actor, index) => {
              const chunkIndex = Math.floor(index / 3);
              if (!acc[chunkIndex]) {
                acc[chunkIndex] = [];
              }
              acc[chunkIndex].push(actor);
              return acc;
            }, []).map((chunk, chunkIndex) => (
              <Carousel.Item key={chunkIndex}> {/* Wrap items in Carousel.Item */}
                <div className="d-flex justify-content-center">
                  {chunk.map((actor) => (
                    <div key={actor.id} className="card cast-card m-2">
                      <div className="cast-card-img-wrapper">
                        <img src={`${IMAGE_URL}${actor.profile_path}`} alt={actor.name} className="cast-card-img" />
                        <div className="vertical-text">
                          {actor.name.split("").map((char, charIndex) => (
                            <span key={charIndex} style={{ transform: `rotate(${charIndex * 360 / actor.name.length}deg)` }}>
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="card-body text-center">
                        <p className="text-muted">
                          <small>{actor.character}</small>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default MovieDetails;
