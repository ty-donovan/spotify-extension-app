const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require('firebase/storage');


const serviceAccount = require("../permissions.json");


const app = initializeApp(serviceAccount);
const storage = getStorage(app)
const db = getFirestore(app);


module.exports = { db, storage };