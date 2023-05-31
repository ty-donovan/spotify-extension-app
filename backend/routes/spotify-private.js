const express = require('express');
const router = express.Router();
const { getLikedSongs, getTopArtists, getTopTracks } = require("./spotify-api-methods");

const accessToken = ""

router.get('/private/top-artists-long-term', async (req, res) => {

    const data = await getTopArtists(accessToken, "long_term");
    res.send(data);
});

router.get('/private/top-artists-6-months-term', async (req, res) => {

    const data = await getTopArtists(accessToken, "medium_term");
    res.send(data);
});

router.get('/private/top-artists-1-month-term', async (req, res) => {

    const data = await getTopArtists(accessToken, "short_term");
    res.send(data);
});

router.get('/private/top-tracks-long-term', async (req, res) => {

    const data = await getTopTracks(accessToken, "long_term");
    res.send(data);
});

router.get('/private/top-tracks-6-months-term', async (req, res) => {

    const data = await getTopTracks(accessToken, "long_term");
    res.send(data);
});

router.get('/private/top-tracks-1-month-term', async (req, res) => {

    const data = await getTopTracks(accessToken, "long_term");
    res.send(data);
});

router.get('/private/liked-songs', async (req, res) => {

    const likedSongs = await getLikedSongs(accessToken);
    res.send(likedSongs);
});