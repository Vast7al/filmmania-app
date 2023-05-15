
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import FilmGallery from "./Components/FilmGallery"
import Footer from "./Components/Footer"
function App() {
  const [isPopular, setIsPopular] = useState(true);

  const handleNewClick = () => {
    setIsPopular(false);
  };

  const handlePopularClick = () => {
    setIsPopular(true);
  };

  return (
    <div>
      <Navbar onNewClick={handleNewClick} onPopularClick={handlePopularClick} />
      <FilmGallery isPopular={isPopular} />
      <Footer/>
    </div>
  );
}
export default App;
