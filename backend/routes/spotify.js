var express = require('express')
var router = express.Router()
const db = require("./firebase")
const {getDocs, collection, getDoc, addDoc, updateDoc, deleteDoc, setDoc, doc} = require("firebase/firestore")

module.exports = router;