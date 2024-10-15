// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";  // Import useNavigate to handle route change
// import { FaMicrophone, FaCamera } from "react-icons/fa"; // Import FaCamera icon
// import "./styles.css";

// // Initialize SpeechRecognition API
// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// const Header = ({ onSearch }) => {
//   const [showMobileSidebar, setShowMobileSidebar] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [listening, setListening] = useState(false);
//   const navigate = useNavigate(); // Hook for navigation

//   const handleItemClick = () => {
//     setShowMobileSidebar(true);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     onSearch(e.target.value); 
//   };

//   const handleVoiceSearch = () => {
//     if (listening) {
//       recognition.stop();
//       setListening(false);
//     } else {
//       recognition.start();
//       setListening(true);
//     }

//     recognition.onresult = (event) => {
//       const spokenWords = event.results[0][0].transcript;
//       setSearchTerm(spokenWords);
//       onSearch(spokenWords);
//       setListening(false);
//     };

//     recognition.onspeechend = () => {
//       recognition.stop();
//       setListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error(event.error);
//       setListening(false);
//     };
//   };

//   // Function to navigate to the AR page
//   const handleCameraClick = () => {
//     navigate("/ar"); // Navigate to the AR page when camera icon is clicked
//   };

//   return (
//     <header>
//       <nav>
//         <div className="navtop">
//           <h3>
//             <Link
//               to="/"
//               onClick={() => showMobileSidebar && setShowMobileSidebar(false)}
//               className="project-title"
//             >
//               AR Webstore
//             </Link>
//           </h3>
//           <div
//             className={`mobile-menu-icon ${!showMobileSidebar ? "active" : ""}`}
//             onClick={() => setShowMobileSidebar(!showMobileSidebar)}
//           >
//             {Array.from({ length: 2 + showMobileSidebar }, (_, i) => (
//               <div
//                 key={i}
//                 className={
//                   i === 0 ? "firstbar" : i === 1 ? "secondbar" : "lastbar"
//                 }
//               />
//             ))}
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="search-bar"
//           />
//           <button onClick={handleVoiceSearch} className="voice-search-btn">
//             {listening ? "Listening..." : <FaMicrophone style={{ color: "black" }} size={20} />}
//           </button>
//           {/* Camera icon for AR page */}
//           <button onClick={handleCameraClick} className="camera-btn">
//             <FaCamera style={{ color: "black" }} size={20} />
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { FaMicrophone, FaCamera } from "react-icons/fa"; // Added FaCamera

// Initialize SpeechRecognition API
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Header = ({ onSearch }) => {
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
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button onClick={handleVoiceSearch} className="voice-search-btn">
            {listening ? <FaMicrophone style={{ color: "red" }} size={20}/> : <FaMicrophone style={{ color: "black" }} size={20} />}
          </button>

          {/* Camera Icon */}
          <button
            onClick={() => window.location.href = " /3D/index.html"} // Redirect to your HTML file
            className="camera-btn"
            style={{ marginLeft: "10px", padding: "8px", marginBottom: "9px", borderRadius: "15%" }}
          >
            <FaCamera style={{ color: "black" }} size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
