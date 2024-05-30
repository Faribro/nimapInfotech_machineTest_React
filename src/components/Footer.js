import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import required icons

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white d-flex flex-column justify-content-center align-items-center py-5">
      <div className="container">
        <div
          className="footer-content d-flex flex-wrap justify-content-between align-items-center backdrop-filter backdrop-blur-md" // Glass effect
        >
          <div className="footer-logo">
            <h1 className="highlighted-text text-white">
              Task Submitted to{" "}
              <span className="nimap-highlight">Nimap Infotech</span>
            </h1>
            <a
              href="https://www.nimapinfotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Nimap Infotech
            </a>
          </div>
          <div className="social-links d-flex align-items-center">
            <a
              href="https://github.com/Faribro/nimapInfotech_machineTest_React"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/farid-sayyed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="container py-2">
        <div className="text-center text-muted">Developed by Farid Sayyed</div>
      </div>
    </footer>
  );
};

export default Footer;
