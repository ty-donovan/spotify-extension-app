import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Typography, ButtonGroup } from '@mui/material'
import { Link, Outlet, useParams } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';
export default function NavigationBar() {
        const params = useParams();
        const userId = params.id;
        const [currentUser, setCurrentUser] = useState(null)
        const [userData, setUserData] = useState()

        async function getUserData(id) {
            let content = {id: id};
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
            .then(getUser( userId )
                .then(user => {
                    setCurrentUser(user)
                }))
        },[userId])
    
        return (
            <React.Fragment>
                <AppBar>
                    <Toolbar>
                    <IconButton component={Link} to={"/" + userId + "/home"}>
                        <HomeIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant='body1' ml='20px' mr='20px'>{currentUser && ("Welcome, " + currentUser.username)}</Typography>
                    <ButtonGroup variant="contained" disableElevation>
                        <Button sx={{ color: 'white' }} component={Link} to={"/" + userId + "/classes"}>Class List</Button>
                        <Button sx={{ color: 'white' }} component={Link} to={"/" + userId + "/students"}>Student Directory</Button>
                        <Button sx={{ color: 'white' }} component={Link} to={"/" + userId + "/staff"}>Staff Directory</Button>
                    </ButtonGroup>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <IconButton component={Link} to={"/"}>
                        <LogoutIcon sx={{ color: 'white' }} />
                    </IconButton>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <Outlet context={currentUser} />
            </React.Fragment>
        )
    
    async function getUser() {
        console.log(userData)
       const currentUser = {
        username: userData.result._document.data.value.mapValue.fields.username.stringValue
       }
        return (currentUser)
    }
    
}