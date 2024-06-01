import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { IMAGE_URL } from "../utils/constant";
import NotFoundMessage from "./NotFoundMessage";
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

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = document.querySelector("#cast-slider");
      if (carousel && !carousel.classList.contains("carousel-sliding")) {
        carousel.dispatchEvent(new Event("slide.bs.carousel", { bubbles: true }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="container-fluid bg-dark py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src={`${IMAGE_URL}${poster_path}`} alt={original_title} className="img-fluid mb-3" />
            </div>
            <div className="col-md-8">
              <h1 className="text-light">{original_title}</h1>
              <p className="text-light">Rating: {vote_average}</p>
              <p className="text-light">Genres: {genres.map((genre) => genre.name).join(", ")}</p>
              <p className="text-light">Release Date: {formattedDate}</p>
              <h2 className="text-light">Overview</h2>
              <p className="text-light">{overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="my-4">Cast</h2>
        <div id="cast-slider" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-inner">
            {cast.reduce((acc, actor, index) => {
              const chunkIndex = Math.floor(index / 3);
              if (!acc[chunkIndex]) {
                acc[chunkIndex] = [];
              }
              acc[chunkIndex].push(actor);
              return acc;
            }, []).map((chunk, chunkIndex) => (
              <div key={chunkIndex} className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}>
                <div className="d-flex justify-content-center">
                  {chunk.map((actor) => (
                    <div key={actor.id} className="card cast-card m-2">
                      <img src={`${IMAGE_URL}${actor.profile_path}`} alt={actor.name} className="card-img-top" />
                      <div className="card-body text-center">
                        <p className="text-muted mb-0">{actor.character}</p>
                        <p className="text-muted">{actor.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#cast-slider" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#cast-slider" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default MovieDetails;
