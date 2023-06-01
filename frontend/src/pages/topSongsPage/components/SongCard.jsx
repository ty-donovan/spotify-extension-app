import React from "react";
import "./SongCard.css";
import "../../topArtistsPage/components/ArtistsCard.css"

function SongCard({ url, rank, name, artist, time }) {
  return (
    <div className="card">
      <img
        src={url}
        alt="artist photo"
        width={300}
        height={300}
      />
      <div>
        <h2>{name}</h2>
        <p>Artist: {artist}</p>
        <p>Time: {time}</p>
      </div>
      <div className="box">
        <p>#{rank}</p>
      </div>
    </div>
  );
}

export default SongCard;