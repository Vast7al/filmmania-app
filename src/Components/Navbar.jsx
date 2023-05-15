import React, { useState } from 'react';
import "../App.css";
import filmaniaLogo from "../Images/filmania-logo.webp";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const Navbar = ({onNewClick, onPopularClick}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_KEY}&query=${searchQuery}`)
      .then(response => {
        setSearchResults(response.data.results);
        setShowResults(true);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleCancel() {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  }

  return (
    <div className="navbar-container">
      <nav className="navbar-content">
        <ul>
          <div className="site-logo">
            <img src={filmaniaLogo} alt="Logo" />
          </div>
          <div className="navbar-buttons">
            <li>
              <button onClick={onNewClick}>TOP</button>
            </li>
            <li>
              <button onClick={onPopularClick}>POPULAR</button>
            </li>
          </div>
          <div className="search-bar-container">
            <form onSubmit={handleSearch}>
              <span className="search-bar-icon">
                <FontAwesomeIcon icon={faSearch} size="2x" />
              </span>
              <input 
                type="search" 
                placeholder="Search for movies/TV series" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                onFocus={() => setShowResults(true)}
              />
            </form>
            {showResults && (
              <div className="search-results-container">
                <ul>
                  {searchResults.map(result => (
                    <li key={result.id}>
                      <div className="search-result-item">
                        <img src={`https://image.tmdb.org/t/p/w185/${result.poster_path}`} alt={result.title || result.name} />
                        <div className="search-result-details">
                          <h3>{result.title || result.name}</h3>
                          <p>{result.overview}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;