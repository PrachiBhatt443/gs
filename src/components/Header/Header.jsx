import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// Initialize SpeechRecognition API
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Header = ({ onSearch }) => {
  const navigationLinks = [
    { label: "Home", Path: "/" },
    { label: "WishList", Path: "/wishlist" },
    { label: "About", Path: "/about" },
    { label: "Feedback", Path: "/feedback" },
    { label: "Contact", Path: "/contact" },
  ];

  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [listening, setListening] = useState(false); // Track if voice input is active

  const handleItemClick = () => {
    setShowMobileSidebar(true);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to App component
  };

  // Start voice recognition
  const handleVoiceSearch = () => {
    if (listening) {
      recognition.stop(); // Stop if already listening
      setListening(false);
    } else {
      recognition.start(); // Start listening
      setListening(true);
    }

    recognition.onresult = (event) => {
      const spokenWords = event.results[0][0].transcript;
      setSearchTerm(spokenWords); // Set the voice input as the search term
      onSearch(spokenWords); // Pass it to the parent component
      setListening(false); // Stop listening after a result
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setListening(false); // Stop listening when speech ends
    };

    recognition.onerror = (event) => {
      console.error(event.error); // Handle any recognition errors
      setListening(false);
    };
  };

  return (
    <header>
      <nav>
        <div className="navtop">
          <h3>
            <Link
              to="/"
              onClick={() => showMobileSidebar && setShowMobileSidebar(false)}
              className="project-title"
            >
              AR Webstore
            </Link>
          </h3>
          <div
            className={`mobile-menu-icon ${!showMobileSidebar ? "active" : ""}`}
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            {Array.from({ length: 2 + showMobileSidebar }, (_, i) => (
              <div
                key={i}
                className={
                  i === 0 ? "firstbar" : i === 1 ? "secondbar" : "lastbar"
                }
              />
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button onClick={handleVoiceSearch} className="voice-search-btn">
            🎤 {listening ? "Listening..." : "Voice Search"}
          </button>
        </div>

        {/* Desktop Navigation */}
      </nav>
      <ul className={`desktop-nav ${showMobileSidebar ? "" : "show"}`}>
        {navigationLinks.map((items, key) => {
          return (
            <li key={key} onClick={handleItemClick}>
              <Link to={items.Path}>{items.label}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
