import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGUzZWQ5OGM4NzRmY2Y5ODFjNTk4YWIxODI0NTc2YiIsIm5iZiI6MTc0Mzc2ODQ1NC42OTcsInN1YiI6IjY3ZWZjYjg2YWE3N2UwOGFmNzk5NDBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vuXgVFO2Pvf-OcYuAC1UNHU7awgZx_dm9UQlvmMVz7Y",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    // Fetch data from TMDB
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error("API error:", err));

    // Add horizontal scroll on wheel
    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    // Clean up event listener
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            card.backdrop_path && (
              <div className="card" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title}
                />
                <p>{card.original_title}</p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
