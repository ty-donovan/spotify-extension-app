import React from "react";
import "./TopArtistsPage.css";
import ArtistsCard from "./components/ArtistsCard";
import { useState, useEffect } from "react";

function TopArtistsPage() {

  const [selectedButton, setSelectedButton] = useState("12 Months +");

  const handleClick = (e) => {
    setSelectedButton(e.target.innerText);
  };

  return (
    <div className="main-wrapper">
      <div className="button-wrapper">
        <button className={selectedButton === '12 Months +' ? 'selected' : ''} onClick={handleClick}>12 Months +</button>
        <button className={selectedButton === '6 Months' ? 'selected' : ''} onClick={handleClick}>6 Months</button>
        <button className={selectedButton === '1 Month' ? 'selected' : ''} onClick={handleClick}>1 Month</button>
      </div>
      <div className="main-container">
        <div className="title-wrapper">
            <h1>Your</h1>
            <h1>Top</h1>
            <h1>Artist</h1>
        </div>
        <img
          src="https://www.udiscovermusic.com/wp-content/uploads/2022/03/Keshi-Gabriel-Album.jpg"
          alt="artist photo"
          width={300}
          height={300}
        />
        <div className="info">
            <h1>Artist's Name</h1>
            <h2>100</h2>
        </div>
      </div>
      <div className="other-elements">
        <ArtistsCard url={"https://www.wymeruk.co.uk/_webedit/cached-images/1162-2085-0-640-638.jpg"} rank={2}/>
        <ArtistsCard url={"https://images.squarespace-cdn.com/content/v1/53b6eb62e4b06e0feb2d8e86/1607362705516-R5Q22H4FVIVPNMW8OWD7/SamSpratt_KidCudi_ManOnTheMoon3_AlbumCover_Web.jpg?format=1500w"} rank={3}/>
        <ArtistsCard url={"https://www.graphicdesignforum.com/uploads/default/original/2X/d/d3c4e744046205a49d06beb874df3b39da7c9c73.jpeg"} rank={4}/>
        <ArtistsCard url={"https://publish.one37pm.net/wp-content/uploads/2023/01/All-Time-Best-Album-Covers-Mobile-Images-ONE37pm.com-11.png?resize=720%2C780"} rank={5}/>
        <ArtistsCard url={"https://www.skillshare.com/blog/wp-content/uploads/2020/10/AwakenMyLoveE28093Childish.jpeg"} rank={6}/>
        <ArtistsCard url={"https://cdn.musebycl.io/2021-03/travisscott_astroworld_hed_2021.jpg"} rank={7}/>
        <ArtistsCard url={"https://assets-global.website-files.com/5e6a544cadf84b1393e2e022/611d00bb314c27482207b279_71BekDJBb3L._SL1425_%20(1).jpg"} rank={8}/>
        <ArtistsCard url={"https://www.udiscovermusic.com/wp-content/uploads/2022/03/janelle-monae-dirty-computer.jpg"} rank={9}/>
        <ArtistsCard url={"https://i0.wp.com/fantastichiphop.blog/wp-content/uploads/2020/12/CUDI.jpg?fit=640%2C640&ssl=1"} rank={10}/>
      </div>
    </div>
  );
}

export default TopArtistsPage;
