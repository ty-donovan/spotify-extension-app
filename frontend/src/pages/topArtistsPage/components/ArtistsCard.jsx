import React from "react";
import "./ArtistsCard.css";

function ArtistsCard() {
  return (
    <div className="artistscard">
      <img
        src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="artist photo"
        width={300}
        height={300}
      />
      <h3>Artist's Name</h3>
      <p>Artist's Popularity</p>
    </div>
  );
}

export default ArtistsCard;
