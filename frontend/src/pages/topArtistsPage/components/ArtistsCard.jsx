import React from "react";
import "./ArtistsCard.css";

function ArtistsCard({ url, rank }) {
  return (
    <div className="card">
      <img
        src={url}
        alt="artist photo"
        width={300}
        height={300}
      />
      <div>
        <h2>Artist's Name</h2>
        <p>Artist's Popularity</p>
      </div>
      <div className="box">
        <p>#{rank}</p>
      </div>
    </div>
  );
}

export default ArtistsCard;
