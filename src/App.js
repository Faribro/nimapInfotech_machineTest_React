import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import TopRatedPage from "./components/TopRatedPage";
import UpcomingPage from "./components/UpcomingPage";
import MovieDetails from "./components/MovieDetails";
import LogoAnimation from "./components/LogoAnimation"; // Import the LogoAnimation component
import Footer from "./components/Footer"; // Import the Footer component
import "./styles.css";

const Head = () => (
  <>
    <LogoAnimation /> {/* Render the LogoAnimation component */}
    <Outlet />
    
  </>
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Head />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer /> {/* Render the Footer component */}  
    </>
  );
};

export default App;
