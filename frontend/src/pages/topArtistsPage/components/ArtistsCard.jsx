import React from "react";
import "./ArtistsCard.css";

function ArtistsCard({ url, rank, name, popularity }) {
  return (
    <div className="top-card">
      <img
        src={url}
        alt="artist photo"
        width={300}
        height={300}
      />
      <div>
        <h2>{name}</h2>
      </div>
      <div className="box">
        <p>#{rank}</p>
      </div>
    </div>
  );
}

export default ArtistsCard;
