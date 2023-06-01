import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, ButtonGroup } from '@mui/material'
import { Link, Outlet, useParams } from 'react-router-dom'
function OtherUserPage() {
    const params = useParams();
    const userId = params.id;
    return (
        <div>
            <Button variant="contained"className='navButtons' component={Link} to={"/" + userId + "/likedSongs"}>Liked Songs</Button>
            <Button variant="contained"className='navButtons' component={Link} to={"/" + userId + "/topSongs"}>Top Songs</Button>
            <Button variant="contained"className='navButtons' component={Link} to={"/" + userId + "/topArtists"}>Top Artists</Button>
        </div>
    );
}

export default OtherUserPage;