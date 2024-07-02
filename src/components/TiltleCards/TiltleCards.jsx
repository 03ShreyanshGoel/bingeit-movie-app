import React, { useEffect, useState } from 'react'
import './TiltleCards.css'
import Cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const TiltleCards = ({ title, category }) => {
  const [apiData,setApiData]=useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWM1Zjg0NWRiNmEyZWU1MjMzMGRiNzEzMGRjMzE5NyIsIm5iZiI6MTcxOTg2NzA3NS45MDc2OTgsInN1YiI6IjY2ODMxNTY4YjI5MTJhMGNkNjFiNzk0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EDflL7idZLhcshGgeW3w_0m0lePgyaT3Mxr5aGf35Wg'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category:"now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TiltleCards