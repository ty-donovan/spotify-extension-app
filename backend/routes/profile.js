const express = require("express")
const router = express.Router()
const { db, storage } = require("./firebase")
const fileUpload = require('express-fileupload')
const { getDocs, collection, doc, getDoc, updateDoc } = require("firebase/firestore");
const { ref, uploadBytes, getDownloadURL, listAll } = require("firebase/storage");
const bodyParser = require("body-parser");

router.use(fileUpload());
let userId;

router.get("/checkUser", async (req, res, next) => {
    const allDocData = [];
    const docs = await getDocs(collection(db, "users"))
    docs.forEach((doc) => allDocData.push(doc.data()))
    let index = 0;
    docs.forEach((doc) => {
        allDocData[index].id = doc.id
        index++;
    })
    res.json({ result: allDocData })

})

//verifying user on homepage
router.put("/isUser", async (req, res, next) => {
    const user = await getDoc(doc(db, "users", req.body.id))
    const currentUser = user.data();
    userId = user.id;
    res.json({ result: currentUser })
})

//uploading profile picture
router.post("/upload", bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
    (req, res) => {
        const imageRef = ref(storage, 'profilePictures/' + userId + ".jpeg")
        uploadBytes(imageRef, req.body)
        res.sendStatus(200)
    }
)

//requesting profile picture from storage
router.put("/get-picture", async (req, res, next) => {
    const imageRef = ref(storage, 'profilePictures/' + req.body.id + ".jpeg");
    const url = await getDownloadURL(imageRef)
    res.json({ url: url })
})

//requesting all profile pics uploaded
router.put("/get-list", async (req, res, next) => {
    const allPics = [];
    const imageRef = ref(storage, 'profilePictures/');
    const urls = await listAll(imageRef);
    urls.items.forEach((ref) => allPics.push(ref._location.path_))
    console.log(allPics)
    res.json({ urls: allPics })
})

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
})

//making profile public/private
router.put("/make-public", async (req, res, next) => {
    await updateDoc(doc(db, "users", userId), {
        isPublic: req.body.isPublic
    })
    res.sendStatus(200);
})

module.exports = router;