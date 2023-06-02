const express = require('express');
const router = express.Router();
const { getLikedSongs, getTopArtists, getTopTracks } = require("./spotify-api-methods");

const db = require("./firebase");
const { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } = require("firebase/firestore");

router.get('/public/top-artists-long-term', async (req, res) => {
    const { id, accessToken } = req.body;

    try {
        const data = await getTopArtists(accessToken, "long_term");
        addArtistsToUser(id, data, "long_term");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/public/top-artists-6-months-term', async (req, res) => {
    const { id, accessToken } = req.body;

    try {
        const data = await getTopArtists(accessToken, "medium_term");
        addArtistsToUser(id, data, "medium_term");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/public/top-artists-1-month-term', async (req, res) => {
    const { id, accessToken } = req.body;

    try {
        const data = await getTopArtists(accessToken, "short_term");
        addArtistsToUser(id, data, "short_term");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/public/top-tracks-long-term', async (req, res) => {
    const { id, accessToken } = req.body;

    try {
        const data = await getTopTracks(accessToken, "long_term");
        addTracksToUser(id, data, "long_term");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/public/top-tracks-6-months-term', async (req, res) => {
    const { id, accessToken } = req.body;

    try {
        const data = await getTopTracks(accessToken, "medium_term");
        addTracksToUser(id, data, "medium_term");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/public/top-tracks-1-month-term', async (req, res) => {
    const { id, accessToken } = req.body;

    try {
        const data = await getTopTracks(accessToken, "short_term");
        addTracksToUser(id, data, "short_term");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/public/liked-songs', async (req, res) => {
    const { id, accessToken } = req.body;

    try {
        const likedSongs = await getLikedSongs(accessToken);
        addLikedSongsToUser(id, likedSongs);
        res.send(likedSongs);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

async function addArtistsToUser(userId, artists, duration) {
    const userRef = db.collection('users').doc(userId);
    const colID = `artists-${duration}`
    const artistsSnapshot = await userRef.collection(colID).limit(1).get();

    if (artistsSnapshot.empty) {
        // Create artists subcollection if it doesn't exist
        await userRef.createCollection(colID);
    }

    const artistsRef = userRef.collection(colID);
    artists.forEach(artist => {
        artistsRef.add({
            image: artist.image,
            name: artist.name,
            popularity: artist.popularity,
        });
    });
}

async function addTracksToUser(userId, tracks, duration) {
    const userRef = db.collection('users').doc(userId);
    const colID = `tracks-${duration}`
    const tracksSnapshot = await userRef.collection(colID).limit(1).get();

    if (tracksSnapshot.empty) {
        await userRef.createCollection(colID);
    }

    const tracksRef = userRef.collection(colID);
    tracks.forEach(track => {
        tracksRef.add({
            image: track.image,
            name: track.name,
            artist: track.artist,
            time: track.time,
        });
    });
}

async function addLikedSongsToUser(userId, songs) {
    const userRef = db.collection('users').doc(userId);
    const likedSongsSnapshot = await userRef.collection('liked-songs').limit(1).get();

    if (likedSongsSnapshot.empty) {
        await userRef.createCollection('liked-songs');
    }

    const likedSongsRef = userRef.collection('liked-songs');
    songs.forEach(song => {
        likedSongsRef.add({
            image: song.image,
            name: song.name,
            artist: song.artist,
            time: song.time,
        });
    });
}

module.exports = router;