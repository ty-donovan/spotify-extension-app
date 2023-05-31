import React from "react";
import "./TopArtistsPage.css";
import ArtistsCard from "./components/ArtistsCard";

function TopArtistsPage() {
  return (
    <div className="topArtists-wrapper">
      <h1>Top Artists Page</h1>
      <div className="topArtist-container">
        <div className="your-top-song">
            <h2>Your Top Artist</h2>
        </div>
        <img
          src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="artist photo"
          width={300}
          height={300}
        />
        <div className="artist-info">
            <h1>Artist's Name</h1>
            <h2>Score: 100</h2>
        </div>
      </div>
    </div>
  );
}

export default TopArtistsPage;
