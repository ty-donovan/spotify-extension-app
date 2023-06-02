import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material';
import silhouette from '../profilePage/silhouette.png';
import '../profilePage/ProfilePage.css';
import useWindowSize from '../homePage/useWindowSize';

function OtherUserPage() {
    //state variables
    const size = useWindowSize();
    const params = useParams();
    const userId = params.id;
    const otherId = params.otherId;
    const [userData, setUserData] = useState();
    const [userProfile, setUserProfile] = useState();
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [profilePic, setProfilePic] = useState();
    const [otherUser, setOtherUser] = useState();
    //fetching current user
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
    //fetching current user 
    useEffect(() => {
        getUserData(otherId);
    }, [otherId, isDataChanged])
    //setting current profile
    useEffect(() => {
        if (userData)
            setUserProfile({
                username: userData.result.username,
                fullName: userData.result.fullname,
                displayName: userData.result.displayName,
                bio: userData.result.bio,
                isPublic: userData.result.isPublic,
                favoriteArtist: userData.result.favoriteArtist,
                favoriteSong: userData.result.favoriteSong,
                favoriteAlbum: userData.result.favoriteAlbum,
            })
    }, [userData])

    async function getPic() {
        if (userData && userData.result.hasPic) {
            let content = { id: otherId }
            await fetch("http://localhost:9000/profile/get-picture", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(content)
            })
                .then((response) => response.json())
                .then((data) => setProfilePic(data))
        }
    }


    useEffect(() => {
        getPic()
    }, [userData])

    return (
        <>
            {!userProfile ? <h1>Loading...</h1> :
                <>
                    <div className='profileBox'>
                        <div className='imageBox'>
                            {profilePic ? <img src={profilePic.url} alt='profile picture' className='profilePic'></img> :
                                <img src={silhouette} alt='profile picture' className='profilePic'></img>
                            }

                        </div>
                        <div className='textBox'>
                            {(size.width > 600) &&
                                <>
                                    <h3 style={{ marginTop: "7%" }}>Profile</h3>
                                    {userProfile.displayName ?
                                        <h1 className='displayName'>{userProfile.displayName}</h1> :
                                        <h1 className='displayName'>{userProfile.username}</h1>
                                    }

                                    <h2 className='username'>Username: {userProfile.username}</h2>
                                    {userProfile.displayName ? <Button sx={{ marginTop: "1%", color: "white", border: "none", backgroundColor: "#363535" }}>Message {userProfile.displayName}</Button> :
                                        <Button sx={{ marginTop: "1%", color: "white", border: "none", backgroundColor: "#363535" }}>Message {userProfile.username}</Button>}
                                </>}
                            {(size.width <= 600) &&
                                <>
                                    {userProfile.displayName ?
                                        <h2>{userProfile.displayName}</h2> :
                                        <h2>{userProfile.username}</h2>
                                    }

                                    <h3>Username: {userProfile.username}</h3>
                                </>}
                        </div>
                    </div>
                    <div className='bioBox'>
                        {(userProfile.bio || userProfile.favoriteArtist || userProfile.favoriteSong || userProfile.favoriteAlbum) &&
                            <h1>About:</h1>}
                        {userProfile.bio &&
                            <h2>{userProfile.bio}</h2>
                        }
                        {userProfile.favoriteArtist &&
                            <>
                                <h2>Favorite Artist:</h2>
                                <h3>{userProfile.favoriteArtist}</h3>
                            </>}
                        {userProfile.favoriteSong &&
                            <>
                                <h2>Favorite Song:</h2>
                                <h3>{userProfile.favoriteSong}</h3>
                            </>}
                        {userProfile.favoriteAlbum &&
                            <>
                                <h2>Favorite Album:</h2>
                                <h3>{userProfile.favoriteAlbum}</h3>
                            </>}
                    </div>
                </>
            }
        </>
    );
}

export default OtherUserPage;