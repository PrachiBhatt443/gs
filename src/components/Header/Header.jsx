import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = ({ onSearch }) => {
  const navigationLinks = [
    { label: "Home", Path: "/" },
    // { label: "WishList", Path: "/wishlist" },
    { label: "About", Path: "/about" },
    // { label: "Feedback", Path: "/feedback" },
    { label: "Contact", Path: "/contact" },
  ];

  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleItemClick = () => {
    setShowMobileSidebar(true);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to App component
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
              GyanSetu
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
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />

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
