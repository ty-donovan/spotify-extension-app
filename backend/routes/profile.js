const express = require("express")
const router = express.Router()
const { db, storage } = require("./firebase")
const fileUpload = require('express-fileupload')
const { getDocs, collection, doc, getDoc, updateDoc, addDoc, arrayUnion, arrayRemove, query, where } = require("firebase/firestore");
const { ref, uploadBytes, getDownloadURL, listAll } = require("firebase/storage");
const bodyParser = require("body-parser");
router.use(fileUpload());
let userId;

router.get("/likes", async (req, res, next) => {
  const allMessagesData = [];
  const docs = await getDocs(collection(db, "discussionBoard"));
  docs.forEach((doc) => {
    let data = doc.data();
    allMessagesData.push({
      id: doc.id,
      likes: data.likes,
      dislikes: data.dislikes,
    });
  });
  res.json({ allMessagesData });
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
    dislikes: req.body.dislikes,
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
  };
  const docSnap = await updateDoc(docRef, {
    posts: arrayUnion(addPost),
  });
  res.json({ result: docSnap });
});
//update likes
router.put("/forum/:postId/addlikes", async (req, res, next) => {
  const id = req.params.postId;
  const docRef = doc(db, "discussionBoard", id);
  const docSnap = await updateDoc(docRef, {
    likes: arrayUnion(req.body.currentUser),
  });
  res.json({ result: "success" });
});
//update likes
router.put("/forum/:postId/removelikes", async (req, res, next) => {
  const id = req.params.postId;
  const docRef = doc(db, "discussionBoard", id);
  const docSnap = await updateDoc(docRef, {
    likes: arrayRemove(req.body.currentUser),
  });
  res.json({ result: "success" });
});

//update dislikes
router.put("/forum/:postId/adddislikes", async (req, res, next) => {
  const id = req.params.postId;
  const docRef = doc(db, "discussionBoard", id);
  const docSnap = await updateDoc(docRef, {
    dislikes: arrayUnion(req.body.currentUser),
  });
  res.json({ result: "success" });
});
//update dislikes
router.put("/forum/:postId/removedislikes", async (req, res, next) => {
  const id = req.params.postId;
  const docRef = doc(db, "discussionBoard", id);
  const docSnap = await updateDoc(docRef, {
    dislikes: arrayRemove(req.body.currentUser),
  });
  res.json({ result: "success" });
});

//grab search user
async function userSearch(username) {
  const allDocData = [];
  const users = collection(db, "discussionBoard");
  const q = query(users, where("user", "==", username[0]));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allDocData.push(doc.data());
  });
  return allDocData;
}

router.post("/forum/users", async function (req, res) {
  let something = userSearch(req.body.user);
  something.then(function (result) {
    return res.status(200).json({ result });
  });
});

router.get("/checkUser", async (req, res, next) => {
  const allDocData = [];
  const docs = await getDocs(collection(db, "users"));
  docs.forEach((doc) => allDocData.push(doc.data()));
  let index = 0;
  docs.forEach((doc) => {
    allDocData[index].id = doc.id;
    index++;
  });
  res.json({ result: allDocData });
});

//verifying user on homepage
router.put("/isUser", async (req, res, next) => {
  const user = await getDoc(doc(db, "users", req.body.id))
  const currentUser = user.data();
  userId = user.id;
  res.json({ result: currentUser })
});

//uploading profile picture
router.post("/upload", bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
    (req, res) => {
        const imageRef = ref(storage, 'profilePictures/' + userId + ".jpeg")
        uploadBytes(imageRef, req.body)
        res.sendStatus(200)
    }
);

//requesting profile picture from storage
router.put("/get-picture", async (req, res, next) => {
  const imageRef = ref(storage, 'profilePictures/' + req.body.id + ".jpeg");
  const url = await getDownloadURL(imageRef)
  res.json({ url: url })
});

//requesting all profile pics uploaded
router.put("/get-list", async (req, res, next) => {
  const allPics = [];
  const imageRef = ref(storage, 'profilePictures/');
  const urls = await listAll(imageRef);
  urls.items.forEach((ref) => allPics.push(ref._location.path_))
  res.json({ urls: allPics })
});

//editing profile info
router.put("/edit-profile", async (req, res, next) => {
  await updateDoc(doc(db, "users", userId), {
      displayName: req.body.displayName,
      bio: req.body.bio,
      favoriteArtist: req.body.favoriteArtist,
      favoriteSong: req.body.favoriteSong,
      favoriteAlbum: req.body.favoriteAlbum
  })
  res.sendStatus(200);
});

//making profile public/private
router.put("/make-public", async (req, res, next) => {
  await updateDoc(doc(db, "users", userId), {
      isPublic: req.body.isPublic
  })
  res.sendStatus(200);
});

//setting hasPic
router.put("/has-pic", async (req, res) => {
    await updateDoc(doc(db, "users", userId), {
        hasPic: req.body.hasPic
    })
});

module.exports = router;
