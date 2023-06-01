<<<<<<< HEAD
var express = require("express");
var router = express.Router();
const db = require("./firebase");
const {
  getDocs,
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  arrayUnion,
} = require("firebase/firestore");

router.get("/", function (req, res, next) {
  res.send("Back end server is working");
});

//Get specific discussion board post info
router.get("/forum/:postId", async (req, res, next) => {
  const id = req.params.postId;
  const docRef = doc(db, "discussionBoard", id);
  const docSnap = await getDoc(docRef);
  return res.status(200).json({ ...docSnap.data() });
});

//Get all discussion board posts
router.get("/forum", async (req, res, next) => {
  const allMessagesData = [];
  const docs = await getDocs(collection(db, "discussionBoard"));
  docs.forEach((doc) => allMessagesData.push({ id: doc.id, ...doc.data() }));
  res.json({ result: allMessagesData });
});

//add discussion board post
router.post("/forum", async (req, res, next) => {
  const addPost = await addDoc(collection(db, "discussionBoard"), {
    user: req.body.user,
    message: req.body.message,
    likes: req.body.likes,
    posts: req.body.posts,
  });
  res.json({ result: addPost });
});

//add a new post under a discussion board post
router.put("/forum/:postId", async (req, res, next) => {
  const id = req.params.postId;
  const docRef = doc(db, "discussionBoard", id);
  const addPost = {
    user: req.body.user,
    message: req.body.message,
    likes: req.body.likes,
  };
  const docSnap = await updateDoc(docRef, {
    posts: arrayUnion(addPost),
  });
  res.json({ result: docSnap });
});
module.exports = router;
=======
const express = require("express")
const router = express.Router()
const db = require("./firebase")

const {getDocs, collection, query, where, doc, getDoc} = require("firebase/firestore");

//checking entered username and password
async function userAndPasswordMatch( username, password ) {
    const users = collection(db, 'users')
    console.log(users)
    const q = query(users, where('username', '==', username), where('password', '==', password))
    const querySnapshot = await getDocs(q)
    let currentUser;
    querySnapshot.forEach((doc) => {
        currentUser = doc.id;
        return currentUser;
    });
    return false;
}

router.get("/checkUser", async (req, res, next) => {
    const allDocData = [];
  const docs = await getDocs(collection(db, "users"))
  docs.forEach((doc) => allDocData.push(doc.data()))
  let index = 0;
  docs.forEach((doc) => {
        allDocData[index].id = doc.id
        index++;
  })
  console.log(allDocData)
  res.json({result: allDocData})

})

//verifying user on homepage
router.put("/isUser", async (req, res, next) => {
    const currentUser = await getDoc(doc(db, "users", req.body.id))
    res.json({result: currentUser})
})

module.exports = router;
>>>>>>> login/homepage
