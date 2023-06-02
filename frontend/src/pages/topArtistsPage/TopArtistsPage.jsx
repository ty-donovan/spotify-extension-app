import React from "react";
import "./TopArtistsPage.css";
import ArtistsCard from "./components/ArtistsCard";
import { useState, useEffect } from "react";
import { AccessTokenContext } from "../../accessTokenContext";
import { useContext } from "react";
import axios from "axios";

function TopArtistsPage() {
  const { accessToken } = useContext(AccessTokenContext);
  const [topArtists, setTopArtists] = useState([]);

  console.log(accessToken);

  useEffect(() => {
    axios
      .get(
        `http://localhost:9000/spotify-private/top-artists-long-term/${accessToken}`
      )
      .then((res) => {
        setTopArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  const handleLongTermClick = (e) => {
    setSelectedButton(e.target.innerText);
    axios
      .get(
        `http://localhost:9000/spotify-private/top-artists-long-term/${accessToken}`
      )
      .then((res) => {
        setTopArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMediumTermClick = (e) => {
    setSelectedButton(e.target.innerText);
    axios
      .get(
        `http://localhost:9000/spotify-private/top-artists-medium-term/${accessToken}`
      )
      .then((res) => {
        setTopArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShortTermClick = (e) => {
    setSelectedButton(e.target.innerText);
    axios
      .get(
        `http://localhost:9000/spotify-private/top-artists-short-term/${accessToken}`
      )
      .then((res) => {
        setTopArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(topArtists);
  const [selectedButton, setSelectedButton] = useState("12 Months +");

  return (
    <div className="main-wrapper">
      <div className="button-wrapper">
        <button
          className={selectedButton === "12 Months +" ? "selected" : ""}
          onClick={handleLongTermClick}
        >
          12 Months +
        </button>
        <button
          className={selectedButton === "6 Months" ? "selected" : ""}
          onClick={handleMediumTermClick}
        >
          6 Months
        </button>
        <button
          className={selectedButton === "1 Month" ? "selected" : ""}
          onClick={handleShortTermClick}
        >
          1 Month
        </button>
      </div>
      <div className="main-container">
        <div className="title-wrapper">
          <h1>Your</h1>
          <h1>Top</h1>
          <h1>Artist</h1>
        </div>
        <img
          src={topArtists?.[0]?.image}
          alt="artist photo"
          width={300}
          height={300}
        />
        <div className="info">
          <h1>{topArtists?.[0]?.name}</h1>
        </div>
      </div>
      <div className="other-elements">
        {topArtists
            ?.slice(1)
            ?.map((artist, index) => (
              <ArtistsCard
                key={index}
                url={artist.image}
                rank={index + 2}
                name={artist.name}
                popularity={artist.popularity}
              />
            ))}
      </div>
    </div>
  );
}

export default TopArtistsPage;
