const express = require('express');
const router = express.Router();
const { getLikedSongs, getTopArtists, getTopTracks } = require("./spotify-api-methods");

const clientId = "c5f9d12227c1413fbe60e6e562f054ec"; // Replace with your client ID
const accessToken = ""

router.get('/private/top-artists-long-term', async (req, res) => {

    const data = await getTopArtists("long_term");
    res.send(data);
});

router.get('/private/top-artists-6-months-term', async (req, res) => {

    const data = await getTopArtists("medium_term");
    res.send(data);
});

router.get('/private/top-artists-1-month-term', async (req, res) => {

    const data = await getTopArtists("short_term");
    res.send(data);
});

router.get('/private/top-tracks-long-term', async (req, res) => {

    const data = await getTopTracks("long_term");
    res.send(data);
});

router.get('/private/top-tracks-6-months-term', async (req, res) => {

    const data = await getTopTracks("long_term");
    res.send(data);
});

router.get('/private/top-tracks-1-month-term', async (req, res) => {

    const data = await getTopTracks("long_term");
    res.send(data);
});

router.get('/private/liked-songs', async (req, res) => {

    const likedSongs = await getLikedSongs(accessToken);
    res.send(likedSongs);
});