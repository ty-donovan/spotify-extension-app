import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom'
import { Button, TextField } from '@mui/material';
import silhouette from './silhouette.png';
import './ProfilePage.css';
import useWindowSize from '../homePage/useWindowSize';

function ProfilePage() {
    //state variables
    const size = useWindowSize();
    const params = useParams();
    const userId = params.id;
    const [userData, setUserData] = useState();
    const [userProfile, setUserProfile] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [profilePic, setProfilePic] = useState();
    const [isPictureChanged, setIsPictureChanged] = useState(false)
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    let currentUser = useOutletContext();
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
        getUserData(userId);
    }, [userId, isDataChanged])
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

    useEffect(() => {
        if (currentUser)
            setIsCurrentUser(true)
    }, [currentUser])

    useEffect(() => {
        getPic()
    }, [isCurrentUser, isPictureChanged])

    async function uploadPicture() {
        if (selectedImage) {
            await fetch("http://localhost:9000/profile/upload", {
                method: "post",
                headers: {
                    "Content-Type": "image/jpeg"
                },
                body: selectedImage
            }).catch(error => { console.log(error) })
            if (currentUser.hasPic !== true) {
                let body = { hasPic: true }
                await fetch("http://localhost:9000/profile/has-pic", {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
            }
            setIsPictureChanged(!isPictureChanged);
        }
    }
    //toggle edit view
    function toggleEdit() {
        setIsEdit(!isEdit);
    }
    //submit edits to database
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        let content = {
            displayName: formJson.displayName, bio: formJson.bio, favoriteArtist: formJson.favoriteArtist,
            favoriteSong: formJson.favoriteSong, favoriteAlbum: formJson.favoriteAlbum
        }
        await fetch("http://localhost:9000/profile/edit-profile", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        await uploadPicture()
        window.location.reload(true)
    }
    //toggling profile private or public
    async function makePublic() {
        let content;
        if (userProfile.isPublic !== true && userProfile.isPublic !== false)
            content = { isPublic: true }
        else
            content = { isPublic: !userProfile.isPublic }
        await fetch("http://localhost:9000/profile/make-public", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        setIsDataChanged(!isDataChanged)
    }

    async function getPic() {
        if (isCurrentUser && currentUser.hasPic) {
            let content = { id: userId }
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

    return (
        <>
            {!userProfile ? <h1>Loading...</h1> :
                <>
                    <div className='profileBox'>
                        <div className='imageBox'>
                            <img src={profilePic ? profilePic.url : silhouette} alt='profile picture' className='profilePic'></img>
                        </div>
                        <div className='textBox'>
                            {(size.width > 600 && !isEdit) &&
                                <>
                                    <h3 style={{ marginTop: "7%" }}>Profile</h3>
                                    {userProfile.displayName ?
                                        <h1 className='displayName'>{userProfile.displayName}</h1> :
                                        <h1 className='displayName'>{userProfile.username}</h1>
                                    }

                                    <h2 className='username'>Username: {userProfile.username}</h2>
                                    <Button sx={{ marginTop: "3%", backgroundColor: "#363535", color: "white", border: "none" }} onClick={() => toggleEdit()}>Edit Profile</Button>
                                </>}
                            {(size.width <= 600 && !isEdit) &&
                                <>
                                    {userProfile.displayName ?
                                        <h2>{userProfile.displayName}</h2> :
                                        <h2>{userProfile.username}</h2>
                                    }

                                    <h3>Username: {userProfile.username}</h3>
                                    <Button size='small' sx={{ marginTop: "3%", backgroundColor: "#363535", color: "white", border: "none" }} onClick={() => toggleEdit()}>Edit Profile</Button>
                                </>}

                            {isEdit && <div>
                                <form method='post' onSubmit={handleSubmit} style={{ marginTop: "10%" }}>
                                    <div className='editBox'>
                                        {(!userProfile.isPublic || userProfile.isPublic === false) &&
                                            <Button sx={{ marginTop: "3%", color: "white", border: "none", backgroundColor: "#363535" }} onClick={() => {
                                                const confirmBox = window.confirm(
                                                    "Are you Sure?"
                                                )
                                                if (confirmBox === true) {
                                                    makePublic();
                                                }
                                            }}>Make Profile Public</Button>}
                                        {userProfile.isPublic === true &&
                                            <Button sx={{ marginTop: "3%", color: "white", border: "none", backgroundColor: "#363535" }} onClick={() => {
                                                const confirmBox = window.confirm(
                                                    "Are you sure?"
                                                )
                                                if (confirmBox === true) {
                                                    makePublic();
                                                }
                                            }}>Make Profile Private</Button>}
                                        <p1>Display Name:</p1>
                                        <TextField name='displayName' defaultValue={userProfile.displayName ? userProfile.displayName : userProfile.username} style={{ backgroundColor: "rgb(218, 218, 218)" }} />
                                        <p1>Favorite Artist:</p1>
                                        <TextField name='favoriteArtist' defaultValue={userProfile.favoriteArtist ? userProfile.favoriteArtist : "Your favorite artist"} style={{ backgroundColor: "rgb(218, 218, 218)" }} />
                                        <p1>Favorite Song:</p1>
                                        <TextField name='favoriteSong' defaultValue={userProfile.favoriteSong ? userProfile.favoriteSong : "Your favorite song"} style={{ backgroundColor: "rgb(218, 218, 218)" }} />
                                        <p1>Favorite Album:</p1>
                                        <TextField name='favoriteAlbum' defaultValue={userProfile.favoriteAlbum ? userProfile.favoriteAlbum : "Your favorite album"} style={{ backgroundColor: "rgb(218, 218, 218)" }} />
                                        <p1>Bio:</p1>
                                        <textArea name='bio' resize="none" style={{ backgroundColor: "rgb(218, 218, 218)", resize: "none" }}>{userProfile.bio ? userProfile.bio : "Bio goes here."}</textArea>
                                        <p1>Change Profile Pic:</p1>
                                        <input className="uploadButton" type='file' name='image' onChange={(event) => {
                                            setSelectedImage(event.target.files[0]);
                                        }} accept="image/jpeg, image/png" />
                                        <Button type='submit' variant="contained" color="success" sx={{ marginTop: "3%", color: "white", border: "none", width: "20%" }}>Save</Button>
                                    </div>
                                </form>
                                <Button color='error' variant='contained' sx={{ marginTop: "3%", color: "white", border: "none" }} onClick={() => toggleEdit()}>Stop Editing</Button>

                            </div>}

                        </div>
                    </div>
                    {!isEdit &&
                        <div className='bioBox'>
                            {(userProfile.bio || userProfile.favoriteArtist || userProfile.favoriteSong || userProfile.favoriteAlbum) &&
                                <h1 style={{ marginLeft: "1%" }}>About:</h1>}
                            {userProfile.bio &&
                                <h2 style={{ marginLeft: "1%" }}> {userProfile.bio}</h2>
                            }
                            {userProfile.favoriteArtist &&
                                <>
                                    <h2 style={{ marginLeft: "1%" }}>Favorite Artist:</h2>
                                    <h3 style={{ marginLeft: "1%" }}>{userProfile.favoriteArtist}</h3>
                                </>}
                            {userProfile.favoriteSong &&
                                <>
                                    <h2 style={{ marginLeft: "1%" }}>Favorite Song:</h2>
                                    <h3 style={{ marginLeft: "1%" }}>{userProfile.favoriteSong}</h3>
                                </>}
                            {userProfile.favoriteAlbum &&
                                <>
                                    <h2 style={{ marginLeft: "1%" }}>Favorite Album:</h2>
                                    <h3 style={{ marginLeft: "1%" }}>{userProfile.favoriteAlbum}</h3>
                                </>}
                        </div>}
                </>
            }
        </>
    );
}

export default ProfilePage;