import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Footer from './footer';

const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = '4bc1b69';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 2s;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Arial, sans-serif';
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 900px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 1s ease-out;
`;

const Poster = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #444;
  font-family: 'Arial, sans-serif';
  font-size: 1rem;
  line-height: 1.6;

  p {
    margin: 5px 0;
  }

  strong {
    color: #000;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 20px;
  font-family: 'Arial, sans-serif';
`;

const Loading = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin-top: 20px;
  font-family: 'Arial, sans-serif';
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${OMDB_API_URL}?i=${id}&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          setMovie(response.data);
          setError(null);
        } else {
          setError(response.data.Error || 'An error occurred while fetching data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
      }
    };

    fetchMovie();
  }, [id]);

  const handleRatingButtonClick = async () => {
    try {
      const response = await axios.get(`${OMDB_API_URL}?i=${id}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovie(response.data);
        setShowPopup(true);
        setError(null);
      } else {
        setError(response.data.Error || 'An error occurred while fetching data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again later.');
    }
  };

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!movie) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <Title>{movie.Title}</Title>
      <DetailsContainer>
        <Poster src={movie.Poster} alt={movie.Title} />
        <Details>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Type:</strong> {movie.Type}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>
          <p><strong>BoxOffice:</strong> {movie.BoxOffice}</p>
          <p><strong>Awards:</strong> {movie.Awards}</p>
          <Button onClick={handleRatingButtonClick}>View Rating</Button>
        </Details>
      </DetailsContainer>
      {showPopup && (
        <Popup>
          <h2>{movie.Title} Rating</h2>
          {Object.entries(movie.Ratings).map(([key, value]) => (
            <p key={key}><strong>{value.Source}:</strong> {value.Value}</p>
          ))}
          <Button onClick={() => setShowPopup(false)}>Close</Button>
        </Popup>
      )}
      <Footer/>
    </Container>
  );
};

export default MovieDetail;
