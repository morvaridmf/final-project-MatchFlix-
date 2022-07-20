import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LikeButton = ({ movie, setCounter, counter }) => {
  //console.log(movie);
  //This state should be higher up. Maybe make context.
  const [ likedMovies, setLikedMovies ] = useState([]);
  const { user } = useAuth0();

  const sendList = () => {
    fetch('http://localhost:3001/movie', {  
      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user: user.email,
        likedMovies: {...likedMovies}
        }) 
    })
  }

  const handleLike = () => {
    const newLikedMovie = {
      title: movie.title,
      image: movie.poster_path,
      category: [...movie.genre_ids],
      rating: movie.vote_average,
      id: movie.id,
    }
    const newLikedMovies = [...likedMovies].push(newLikedMovie);
    setLikedMovies(newLikedMovies);
    sendList();
    const newNum = counter + 1;
    setCounter(newNum);
  }
  
  //Add a like-icon later
  return <button onClick={() => handleLike()}>Like</button>;
};

export default LikeButton;