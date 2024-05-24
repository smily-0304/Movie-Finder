import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = '4bc1b69';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${OMDB_API_URL}?s=${searchTerm}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search || []);
        setError(null);
      } else {
        setError(response.data.Error || 'An error occurred while fetching data.');
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again later.');
      setMovies([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div style={styles.container}>
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for movies"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        style={styles.input}
      />
      {error && <p>{error}</p>}
      <div style={styles.movieContainer}>
        {movies.map(movie => (
          <div key={movie.imdbID} style={styles.movieCard}>
            <img src={movie.Poster} alt={movie.Title} style={styles.poster} />
            <div style={styles.movieInfo}>
              <h2 style={styles.title}>{movie.Title}</h2>
              {movie.Language && <p style={styles.language}>Language: {movie.Language}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
   backgroundColor:'lightgray',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '40%',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },
  movieContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  movieCard: {
    width: '200px',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  movieInfo: {
    marginTop: '10px',
  },
  title: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  language: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '0',
  },
};

export default MovieSearch;
