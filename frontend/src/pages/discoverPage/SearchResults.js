import { useState, useEffect } from 'react';
import silhouette from '../profilePage/silhouette.png';
import useWindowSize from '../homePage/useWindowSize';
import { Link, useParams } from 'react-router-dom'
import { Container } from '@mui/material';
export default function SearchResults({ data }) {

    const params = useParams();
    const userId = params.id;
    const size = useWindowSize();
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        setFilteredData(data.filter((element) => {
            return element.isPublic
        }))
    }, [data])

    return (
        <>
            {filteredData.length === 0 &&
                <h2 style={{ marginTop: "2%" }}>Search for likeminded people, and start a conversation.</h2>}
            {filteredData.length > 0 &&
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