import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './footer';

const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = '4bc1b69';

const Container = styled.div`
  background-color: lightgray;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const SearchInput = styled.input`
  width: 40%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieCard = styled(Link)`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const MovieInfo = styled.div`
  margin-top: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
`;

const StaticCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [staticMovies, setStaticMovies] = useState([]);

  useEffect(() => {
    const fetchStaticMovieData = async () => {
      try {
        const response1 = await axios.get(`${OMDB_API_URL}?s=batman&apikey=${API_KEY}&page=1`);
        const response2 = await axios.get(`${OMDB_API_URL}?s=batman&apikey=${API_KEY}&page=2`);
        if (response1.data.Response === 'True' && response2.data.Response === 'True') {
          const combinedMovies = [...response1.data.Search, ...response2.data.Search];
          setStaticMovies(combinedMovies.slice(0, 20));
        } else {
          setError('An error occurred while fetching data.');
        }
      } catch (error) {
        console.error('Error fetching static movie data:', error);
        setError('An error occurred while fetching data. Please try again later.');
      }
    };

    fetchStaticMovieData();
  }, []);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setError(null); // Reset error message when clearing search term
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <Container>
      <h3>Movie Search</h3>
      <SearchInput
        type="text"
        placeholder="Search for movies"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {(searchTerm === '' && !error) && ( // Only render static cards if searchTerm is empty and there is no error
        <StaticCards>
          {staticMovies.map((movie, index) => (
            <StaticCard key={index} movie={movie} />
          ))}
        </StaticCards>
      )}
      {movies.length > 0 && ( // Only render movie cards if there are movies
        <MovieContainer>
          {movies.map(movie => (
            <MovieCard to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <Poster src={movie.Poster} alt={movie.Title} />
              <MovieInfo>
                <Title>{movie.Title}</Title>
              </MovieInfo>
            </MovieCard>
          ))}
        </MovieContainer>
      )}
      {!searchTerm && <Footer />} {/* Render footer only if searchTerm is empty */}
    </Container>
  );
};

const StaticCard = ({ movie }) => {
  return (
    <MovieCard to={`/movie/${movie.imdbID}`}>
      <Poster src={movie.Poster} alt={movie.Title} />
      <MovieInfo>
        <Title>{movie.Title}</Title>
      </MovieInfo>
    </MovieCard>
  );
};

export default MovieSearch;
