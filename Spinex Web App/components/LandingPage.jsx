import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/LandingPage.css";
// import logo from "../images/logo.png"; // Import the image

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    // ✅ Added missing return statement
    <div className="wrapper">
      <nav className="nav">
        <div className="nav-button">
          <div className="logo">
            {/* <img src={logo} alt="VoiceViva Logo" className="logo-img" /> */}
          </div>
          <div className="auth-buttons">
            <button
              className="btn white-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className="btn white-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      <div className="home-content">
        <h1>Welcome to Spine-X</h1>
        <p>
          VoiceVIVA is an interactive website aimed at developing an innovative
          system for conducting VIVA (oral examination) questions.
        </p>
        {/* ✅ Modified the Start button to navigate to '/explore' */}
        <button className="start-btn" onClick={() => navigate("/explore")}>
          Start
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

/* 
  ✅ Modified functionality for the Start button:
  - Previously, it just showed an alert.
  - Now, it navigates to '/explore' when clicked.
  - If '/explore' does not exist, you should add a new route in your App.js:
  
  <Route path="/explore" element={<Explore />} />

  - Make sure you create an 'Explore.js' component and import it in App.js:
  
  import Explore from "./components/Explore";

  - In 'Explore.js', create a simple page:
  
  import React from "react";

  const Explore = () => {
    return (
      <div>
        <h1>Welcome to the Explore Page</h1>
      </div>
    );
  };

  export default Explore;

*/
