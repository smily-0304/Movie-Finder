const LikedMovies = ({ likedMovies }) => {
    
    return (
      <Container>
        <h3>Liked Movies</h3>
        <MovieContainer>
          {likedMovies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              // You can add a prop here to handle unliking movies if needed
            />
          ))}
        </MovieContainer>
        <Footer />
      </Container>
    );
  };
  