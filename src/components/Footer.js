import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import required icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h1 className="highlighted-text">
              Task Submitted to <span className="nimap-highlight">Nimap Infotech</span>
            </h1>
            <a href="https://www.nimapinfotech.com/" target="_blank" rel="noopener noreferrer">
              Nimap Infotech
            </a>
          </div>
          <div className="footer-links">
            <div className="social-links">
              <a href="https://github.com/Faribro/nimapInfotech_machineTest_React" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/farid-sayyed/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <span><i className="fas fa-envelope"></i></span>
                <p>faridsayyed1010@gmail.com</p>
              </div>
              <div className="contact-item">
                <span><i className="fas fa-phone"></i></span>
                <p>9004611981</p>
              </div>
              <div className="contact-item">
                <span><i className="fas fa-map-marker-alt"></i></span>
                <p>Kalyan, Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
