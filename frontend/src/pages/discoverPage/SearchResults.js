import { useState, useEffect } from 'react';
import silhouette from '../profilePage/silhouette.png';
import useWindowSize from '../homePage/useWindowSize';
import { Link, useParams } from 'react-router-dom'
import { Container } from '@mui/material';
export default function SearchResults({ data, isSearch }) {

    const params = useParams();
    const userId = params.id;
    const size = useWindowSize();
    const [filteredData, setFilteredData] = useState([])
    const [pics, setPics] = useState([]);

    useEffect(() => {
        setFilteredData(data.filter((element) => {
            return element.isPublic
        }))
    }, [data])

    async function getPhotos(id) {
        let content = { id: id }
        let thisPic;
        await fetch("http://localhost:9000/profile/get-list", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => setPics(data))
    }

    useEffect(() => {
        getPhotos()
    }, [])

    async function getProfilePic(id) {
        let thisPic = false
        pics.urls.forEach((pic) => {
            if (pic === "profilePictures/" + id + ".jpeg")
                thisPic = true;
        })
        if (thisPic) {
            let currentPicture;
            await fetch("http://localhost:9000/profile/get-picture", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            })
                .then((response) => response.json())
                .then((data) => currentPicture = data.url)
            return currentPicture;
        }

    }

    return (
        <>
            {(filteredData.length === 0 && isSearch) && <h3 style={{ marginTop: "2%" }}>No Users Found</h3>}
            {(filteredData.length === 0 && !isSearch) &&
                <h2 style={{ marginTop: "2%" }}>Search for likeminded people, and start a conversation.</h2>}
            {(filteredData.length > 0 && pics.urls) &&
                <div className='searchBox'>
                    {filteredData.map((element) =>
                        <Container className="result" component={Link} to={"/" + userId + "/" + element.id + "/otherUser"} sx={{ display: "flex", textDecoration: "none", color: "black" }}>
                            <div className='imgBox'>
                                <img src={silhouette} className='img' alt='profile picture' />
                            </div>
                            {size.width > 600 &&
                                <h1 className='teacherNameText' style={{ marginTop: "auto", marginBottom: "auto", marginLeft: "2%" }} >Username: {element.username}</h1>}
                            {size.width <= 600 &&
                                <h2 className='teacherNameText' style={{ marginTop: "auto", marginBottom: "auto", marginLeft: "2%" }}>Username: {element.username}</h2>}

                        </Container>
                    )}

                </div>}
        </>
    );
}