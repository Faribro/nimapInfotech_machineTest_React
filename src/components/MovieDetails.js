import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { IMAGE_URL } from "../utils/constant";
import NotFoundMessage from "./NotFoundMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
      if (carousel) {
        carousel.dispatchEvent(new Event("slide.bs.carousel", { bubbles: true }));
      }
    }, 3000); // Change the interval time here (in milliseconds)

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
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${IMAGE_URL}${backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card border-0 shadow-lg" style={{ padding: "20px", borderRadius: "10px" }}>
              <div className="card-body" style={{ backgroundColor: "transparent", paddingLeft: 0 }}>
                <div className="d-flex align-items-center">
                  <img
                    src={`${IMAGE_URL}${poster_path}`}
                    alt={original_title}
                    style={{ width: "150px", height: "auto", borderRadius: "10px", marginRight: "20px" }}
                  />
                  <div>
                    <h3 className="card-title">{original_title}</h3>
                    <p className="card-text">
                      <strong>Rating:</strong> {vote_average}
                    </p>
                    <p className="card-text">
                      <strong>Genres:</strong> {genres.map((genre) => genre.name).join(", ")}
                    </p>
                    <p className="card-text">
                      <strong>Release Date:</strong> {formattedDate}
                    </p>
                    <h4 className="mt-4">Overview</h4>
                    <p>{overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-5">
          <h4 className="mb-4">Cast</h4>
          <div id="cast-slider" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {cast.reduce((acc, actor, index) => {
                const chunkIndex = Math.floor(index / 5);
                if (!acc[chunkIndex]) {
                  acc[chunkIndex] = [];
                }
                acc[chunkIndex].push(actor);
                return acc;
              }, []).map((chunk, chunkIndex) => (
                <div key={chunkIndex} className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`}>
                  <div className="d-flex justify-content-center">
                    {chunk.map((actor) => (
                      <div key={actor.id} className="card m-2" style={{ width: "10rem" }}>
                        <img src={`${IMAGE_URL}${actor.profile_path}`} alt={actor.name} className="card-img-top" />
                        <div className="card-body text-center">
                          <p className="card-text">{actor.name}</p>
                          <p className="text-muted">
                            <small>{actor.character}</small>
                          </p>
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
        </div>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default MovieDetails;
