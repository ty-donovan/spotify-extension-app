import React from 'react';
import '../topArtistsPage/TopArtistsPage.css';
import './TopSongsPage.css';
import SongCard from './components/SongCard';
import { useState, useEffect } from 'react';
import { AccessTokenContext } from '../../accessTokenContext';
import { useContext } from 'react';
import axios from 'axios';

function TopSongsPage() {

  const { accessToken } = useContext(AccessTokenContext);
  const [selectedButton, setSelectedButton] = useState('12 Months +');
  const [topSongs, setTopSongs] = useState([]);

  console.log(accessToken);

  useEffect(() => {
    axios
      .get(
        `http://localhost:9000/spotify-private/top-tracks-long-term/${accessToken}`
      )
      .then((res) => {
        setTopSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  const handleLongTermClick = (e) => {
    setSelectedButton(e.target.innerText);
    axios
      .get(
        `http://localhost:9000/spotify-private/top-tracks-long-term/${accessToken}`
      )
      .then((res) => {
        setTopSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMediumTermClick = (e) => {
    setSelectedButton(e.target.innerText);
    axios
      .get(
        `http://localhost:9000/spotify-private/top-tracks-medium-term/${accessToken}`
      )
      .then((res) => {
        setTopSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShortTermClick = (e) => {
    setSelectedButton(e.target.innerText);
    axios
      .get(
        `http://localhost:9000/spotify-private/top-tracks-short-term/${accessToken}`
      )
      .then((res) => {
        setTopSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
    return (
      <div className="main-wrapper">
        <div className="button-wrapper">
          <button className={selectedButton === '12 Months +' ? 'selected' : ''} onClick={handleLongTermClick}>12 Months +</button>
          <button className={selectedButton === '6 Months' ? 'selected' : ''} onClick={handleMediumTermClick}>6 Months</button>
          <button className={selectedButton === '1 Month' ? 'selected' : ''} onClick={handleShortTermClick}>1 Month</button>
        </div>
        <div className="main-container">
          <div className="title-wrapper">
              <h1>Your</h1>
              <h1>Top</h1>
              <h1>Song</h1>
          </div>
          <img
            src={topSongs?.[0]?.image}
            alt="songs album photo"
            width={300}
            height={300}
          />
          <div className="info">
              <h1>{topSongs?.[0]?.name}</h1>
              <h2>By: {topSongs?.[0]?.artist}</h2>
              <h2>Duration: {topSongs?.[0]?.time}</h2>
          </div>
        </div>
        <div className="other-elements">
        {topSongs
            ?.slice(1)
            ?.map((song, index) => (
              <SongCard
                key={index}
                url={song.image}
                rank={index + 2}
                name={song.name}
                artist={song.artist}
                time={song.time}
              />
            ))}
        </div>
      </div>
    );
  }
  
  export default TopSongsPage;