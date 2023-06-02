import React from 'react';
import './HomePage.css';
import logoHighRes from './logo-high-res.png'
import discover from './discover1.jpg';
import forum from './forum1.jpg';
import yourTastes from './tastes1.jpg';
import useWindowSize from './useWindowSize';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Typography } from '@mui/material';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function HomePage() {

    const params = useParams();
    const userId = params.id;
    //for resizing 
    const size = useWindowSize();
    return (
        <div>
            <img src={logoHighRes} style={{ width: "16%", margin: "auto", marginTop: "2%" }} alt='Spots logo' />
            <div className='homePage'>
                {size.width > 600 &&
                    <h1 className='titleText'>Welcome to Spots—your one-stop-shop for the music you love and the folks who love it too.</h1>}
                {size.width <= 600 &&
                    <h2 className='titleText'>Welcome to Spots—your one-stop-shop for the music you love and the folks who love it too.</h2>}
            </div>
            {size.width > 600 &&
            <h2 className='subTitleText'>Check out some of the features below.</h2>}
            {size.width <= 600 &&
             <h3 className='subTitleText'>Check out some of the features below.</h3>}
            {size.width > 850 &&
                <div className='cards'>
                    <Card className='card' component={Link} to={"/" + userId + "/discover"}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={discover}
                                alt="People listening to music"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Discover
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Find other users with similar tastes and start a conversation.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card >
                    <Card className='card' component={Link} to={"/" + userId + "/forum"}>
                    <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={forum}
                                alt="people chatting"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Forum
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Start discussions with other users about your favorite songs, or whatever you want.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className='card' component={Link} to={"/" + userId + "/yourTastes"}>
                    <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={yourTastes}
                                alt="music genres word cloud"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Your Tastes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    View your liked songs, as well as your top tracks and artists all on Spots.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>}
            {size.width <= 850 &&
                <div className='cardsSmall'>
                    <Card className='cardSmall' component={Link} to={"/" + userId + "/discover"}>
                    <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={discover}
                                alt="people listening to music"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Discover
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Find other users with similar tastes and start a conversation.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card >
                    <Card className='cardSmall' component={Link} to={"/" + userId + "/forum"}>
                    <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={forum}
                                alt="people chatting"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Forum
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Start discussions with other users about your favorite songs, or whatever you want.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className='cardSmall' component={Link} to={"/" + userId + "/yourTastes"}>
                    <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={yourTastes}
                                alt="music genres word cloud"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Your Tastes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    View your liked songs, as well as your top tracks and artists all on Spots.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>}
        </div>
    );
}

export default HomePage;