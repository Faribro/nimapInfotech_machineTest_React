import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import TopRatedPage from "./components/TopRatedPage";
import UpcomingPage from "./components/UpcomingPage";
import MovieDetails from "./components/MovieDetails";
import LogoAnimation from "./components/LogoAnimation"; 
import FireworksCanvas from "./components/FireworksCanvas";  // Import FireworksCanvas
import Footer from "./components/Footer"; 
import 'animate.css';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <div className="App d-flex flex-column min-vh-100">
        <LogoAnimation /> 
        <FireworksCanvas /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer /> {/* Render the Footer component */}
      </div>
    </>
  );
};

export default App;
