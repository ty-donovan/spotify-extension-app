const express = require('express');
const router = express.Router();
const { getLikedSongs, getTopArtists, getTopTracks } = require("./spotify-api-methods");

router.get('/top-artists-long-term/:token', async (req, res) => {
    const accessToken = req.params.token;
    const data = await getTopArtists(accessToken, "long_term");
    res.send(data);
});

router.get('/top-artists-medium-term/:token', async (req, res) => {
    const accessToken = req.params.token;

    const data = await getTopArtists(accessToken, "medium_term");
    res.send(data);
});

router.get('/top-artists-short-term/:token', async (req, res) => {
    const accessToken = req.params.token;

    const data = await getTopArtists(accessToken, "short_term");
    res.send(data);
});

router.get('/top-tracks-long-term/:token', async (req, res) => {
    const accessToken = req.params.token;

    const data = await getTopTracks(accessToken, "long_term");
    res.send(data);
});

router.get('/top-tracks-medium-term/:token', async (req, res) => {
    const accessToken = req.params.token;

    const data = await getTopTracks(accessToken, "medium_term");
    res.send(data);
});

router.get('/top-tracks-short-term/:token', async (req, res) => {
    const accessToken = req.params.token;

    const data = await getTopTracks(accessToken, "short_term");
    res.send(data);
});

router.get('/liked-songs/:token', async (req, res) => {
    const accessToken = req.params.token;

    const likedSongs = await getLikedSongs(accessToken);
    res.send(likedSongs);
});

module.exports = router;