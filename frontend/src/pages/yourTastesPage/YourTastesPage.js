import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, ButtonGroup } from '@mui/material'
import { Link, Outlet, useParams } from 'react-router-dom'
import "./YourTastesPage.css"

function OtherUserPage() {
    const params = useParams();
    const userId = params.id;
    return (
        <div class="grid-container">
        <Button sx={{ border: "none", backgroundColor: "#363535", padding: "0px" }} component={Link} to={"/" + userId + "/likedSongs"} className="grid-item">
          <div class="image-container">
            <img src="https://e1.pxfuel.com/desktop-wallpaper/579/402/desktop-wallpaper-album-cover-collage-album-collage.jpg" alt="Image 1" class="image" />
            <div class="label">Liked Songs</div>
          </div>
        </Button>
        <Button sx={{ border: "none", backgroundColor: "#363535", padding: "0px" }} component={Link} to={"/" + userId + "/topSongs"} className="grid-item">
          <div class="image-container">
            <img src="https://e0.pxfuel.com/wallpapers/433/620/desktop-wallpaper-see-you-again-tyler-the-creator-thumbnail.jpg" alt="Image 2" class="image" />
            <div class="label">Top Songs</div>
          </div>
        </Button>
        <Button sx={{ border: "none", backgroundColor: "#363535", padding: "0px" }} component={Link} to={"/" + userId + "/topArtists"} className="grid-item">
          <div class="image-container">
            <img src="https://wallpapershome.com/images/pages/pic_v/10610.jpg" alt="Image 3" class="image" />
            <div class="label">Top Artists</div>
          </div>
        </Button>
      </div>
    );
}

export default OtherUserPage;