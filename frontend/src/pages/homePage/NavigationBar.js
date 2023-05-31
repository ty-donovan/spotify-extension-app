import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, ButtonGroup } from '@mui/material'
import { Link, Outlet, useParams } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';
import '@github/details-menu-element';
import "./HomePage.css"
import useWindowSize from './useWindowSize';
export default function NavigationBar() {

    const size = useWindowSize();

    const params = useParams();
    const userId = params.id;
    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState()

    async function getUserData(id) {
        let content = { id: id };
        await fetch("http://localhost:9000/profile/isUser", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
            .then((response) => response.json())
            .then((data) => setUserData(data))
    }
    useEffect(() => {
        getUserData(userId)

    }, [userId])
    useEffect(() => {
        if (userData)
            setCurrentUser({ username: userData.result._document.data.value.mapValue.fields.username.stringValue })
    }, [userData])

    return (
        <React.Fragment>
            <AppBar style={{ backgroundColor: "black" }}>
                <Toolbar>
                    <IconButton component={Link} to={"/" + userId + "/home"}>
                        <HomeIcon sx={{ color: 'white' }} />
                    </IconButton>
                    {size.width > 600 &&
                        <ButtonGroup disableElevation >
                            <Button className='navButtons' sx={{ color: 'white', backgroundColor: "black", border: "none" }} component={Link} to={"/" + userId + "/discover"}>Discover</Button>
                            <Button className='navButtons' sx={{ color: 'white', backgroundColor: "black", border: "none" }} component={Link} to={"/" + userId + "/forum"}>Forum</Button>
                            <Button className='navButtons' sx={{ color: 'white', backgroundColor: "black", border: "none" }} component={Link} to={"/" + userId + "/yourTastes"}>Your Tastes</Button>
                        </ButtonGroup>}
                    {size.width < 600 &&
                        <details>
                            <summary className='summary'>Navigate</summary>
                            <details-menu role="menu" class="dropdown-menu" style={{ backgroundColor: "#e3dfde" }}>
                                <Button sx={{ color: 'black' }} component={Link} to={"/" + userId + "/discover"}>Discover</Button>
                                <Button sx={{ color: 'black', textAlign: "center" }} component={Link} to={"/" + userId + "/forum"}>Forum</Button>
                                <Button sx={{ color: 'black', textAlign: "center" }} component={Link} to={"/" + userId + "/yourTastes"}>Your Tastes</Button>
                                
                            </details-menu>
                        </details>
                    }
                    <Box sx={{ flexGrow: 1 }}></Box>
                    {!currentUser ? <p1></p1> :
                        <details>
                            {size.width > 600 &&
                                <summary className='summary'>{currentUser.username}</summary>}
                            <summary></summary>
                            <details-menu role="menu" class="dropdown-menu dropdown-menu-sw" style={{ backgroundColor: "#e3dfde" }}>
                                <Button sx={{ color: 'black' }} component={Link} to={"/" + userId + "/profile"}>Profile</Button>
                                <Button sx={{ color: 'black' }} component={Link} to={"/" + userId + "/inbox"}>Inbox</Button>
                                <IconButton component={Link} to={"/"} className='logoutButton'>
                                    <LogoutIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </details-menu>
                        </details>
                    }

                </Toolbar>
            </AppBar>
            <Toolbar />
            <Outlet context={currentUser} />
        </React.Fragment>
    )
}