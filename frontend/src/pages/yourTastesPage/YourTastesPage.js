import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import "./YourTastesPage.css";

function OtherUserPage() {
  const params = useParams();
  const userId = params.id;
  return (
    <div class="grid-container">
      <Button
        sx={{ border: "none", backgroundColor: "#363535", padding: "0px" }}
        component={Link}
        to={"/" + userId + "/topSongs"}
        className="grid-item"
      >
        <div class="image-container">
          <img
            src="https://i.ibb.co/L5w58p3/headphones2.jpg"
            alt="Image 1"
            class="image"
          />
          <div class="label">Top Songs</div>
        </div>
      </Button>
      <Button
        sx={{ border: "none", backgroundColor: "#363535", padding: "0px" }}
        component={Link}
        to={"/" + userId + "/likedSongs"}
        className="grid-item"
      >
        <div class="image-container">
          <img
            src="https://c1.wallpaperflare.com/preview/280/509/163/dark-electric-guitar-musical.jpg"
            alt="Image 1"
            class="image"
          />
          <div class="label">Liked Songs</div>
        </div>
      </Button>
      <Button
        sx={{ border: "none", backgroundColor: "#363535", padding: "0px" }}
        component={Link}
        to={"/" + userId + "/topArtists"}
        className="grid-item"
      >
        <div class="image-container">
          <img
            src="https://c1.wallpaperflare.com/preview/894/541/120/sing-a-song-mr-michael-mak-microphone-stage.jpg"
            alt="Image 3"
            class="image"
          />
          <div class="label">Top Artists</div>
        </div>
      </Button>
    </div>
  );
}

export default OtherUserPage;