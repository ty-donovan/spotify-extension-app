import React from "react";
import { useState, useEffect } from "react";
import { AccessTokenContext } from "../../accessTokenContext";
import { useContext } from "react";
import axios from "axios";
import SongCard from "../topSongsPage/components/SongCard.jsx";
import "../topArtistsPage/TopArtistsPage.css";

function LikedSongsPage() {
  const { accessToken } = useContext(AccessTokenContext);
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:9000/spotify-private/liked-songs/${accessToken}`
      )
      .then((res) => {
        setLikedSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  return (
    <div className="main-wrapper">
      <div className="other-elements">
        {likedSongs?.map((song, index) => (
          <SongCard
            key={index}
            url={song.image}
            rank={index + 1}
            name={song.name}
            artist={song.artist}
            time={song.time}
          />
        ))}
      </div>
    </div>
  );
}

export default LikedSongsPage;
