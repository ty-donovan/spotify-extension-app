const express = require('express');
const router = express.Router();
const axios  = require('axios');

const db = require("./firebase");
const { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } = require("firebase/firestore");

router.get('/top-artists-long-term', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/top-artists-long-term');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve top artists");
    }
});

router.get('/top-artists-6-months-term', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/top-artists-6-months-term');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve top artists");
    }
});

router.get('/top-artists-1-month-term', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/top-artists-1-month-term');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve top artists");
    }
});

router.get('/top-artists-1-week-term', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/top-artists-1-week-term');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve top artists");
    }
});

router.get('/top-tracks-long-term', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/top-tracks-long-term');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve top tracks");
    }
});

router.get('/top-tracks-6-months-term', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/top-tracks-6-months-term');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve top tracks");
    }
});

router.get('/top-tracks-1-month-term', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/top-tracks-1-month-term');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve top tracks");
    }
});

router.get('/liked-songs', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/spotify/private/liked-songs');
        const data = response.data;

        //firebase stuff storage here

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve liked songs");
    }
});
